"use client";
import { redirect, usePathname } from "next/navigation";
import { useAuth } from "./auth.hooks";
import React, { PropsWithChildren, useEffect, useState } from "react";
// import NotFoundLayout from "@/components/common/not-found-layout";
import { TRole } from "@/models/role";

export function useIsMounted() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return isMounted;
}
const skipGuard = process.env.NEXT_PUBLIC_SKIP_AUTH === "true" ? true : false;
export const ProtectedLayout = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const user = useAuth().session.user;

  if (!isMounted) return <></>;

  if (!user) {
    if (pathname) {
      redirect(`/auth/login?callback=${pathname}`);
    }
    redirect(`/auth/login`);
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export const RoleBasedLayout = (props: PropsWithChildren) => {
  const pathname = usePathname();
  const { allowedResources } = useAuth();

  const isDynamicRoute = (string: string) => /\[.*?\]/.test(string);

  if (
    !allowedResources.some((resource: string) => {
      if (isDynamicRoute(resource)) {
        // Convert "[phoneNumber]" or any "[...]" into a regex pattern
        const regex = new RegExp(`^${resource.replace(/\[.*?\]/g, ".*")}$`);
        console.log(regex);
        return regex.test(pathname);
      }
      return resource === pathname;
    }) &&
    !skipGuard
  ) {
    return;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};
export const convertPermissions = (roles: TRole[]): string[] => {
  const result: string[] = [];

  roles.forEach((role) => {
    role.resources.forEach((resource) => {
      if (resource.permissions.length > 0) {
        resource.permissions.forEach((permission) => {
          result.push(`${resource.path}/${permission.action}`);
        });
      } else {
        result.push(resource.path);
      }
    });
  });

  return result;
};
export const getPermissionsByResource = (
  roles: TRole[],
  resourcePath: string
): string[] => {
  const resource = findResourceByPath(roles, resourcePath);
  if (!resource) return [];
  return resource.permissions?.map((permission) => permission.action);
};

const findResourceByPath = (roles: TRole[], resourcePath: string) => {
  for (const role of roles) {
    for (const resource of role.resources) {
      if (resource.path !== "/" && resourcePath.includes(resource.path)) {
        return resource;
      }
    }
  }
  return null;
};
