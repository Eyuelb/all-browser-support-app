"use client";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import type { Session } from "./auth.model";
import { AuthContext } from "./auth.context";
import { clearCookieSession, setCookieSession } from "./auth.service";
import { convertPermissions, getPermissionsByResource } from "./auth.guard";
import { usePathname } from "next/navigation";
import { useGetUserById } from "@/query/user";
import { Loader2 } from "lucide-react";
import ErrorPage from "@/components/common/error-page";
import { useTranslations } from "next-intl";

export const AuthProvider = ({
  children,
  session: pSession,
}: {
  children: ReactNode;
  session: Session | undefined;
}) => {
  const path = usePathname();
  const t = useTranslations();
  const [storedSession, setSession] = useState<Session | undefined>(pSession);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(!!pSession?.user);

  // Update isSignedIn when storedSession changes
  useMemo(() => {
    setIsSignedIn(!!storedSession?.user);
  }, [storedSession]);

  const { data, isLoading, isFetching, isError } = useGetUserById(
    storedSession?.user?.id,
    !!storedSession?.token?.access_token
  );
  const user = useMemo(() => data, [data]);

  console.log("AuthProvider state:", {
    storedSession,
    pSession,
    user,
    isSignedIn,
    isLoading,
    isFetching,
  });

  const setSessionToken = useCallback((data: Session) => {
    setIsSignedIn(true);
    setSession(data);
    setCookieSession(data);
  }, []);

  const session = useMemo(
    () =>
      ({
        token: storedSession?.token,
        user: data || storedSession?.user,
        account: storedSession?.account,
      } as Session),
    [storedSession, data]
  );

  const signOut = useCallback(async () => {
    setIsSignedIn(false);
    setSession(undefined);
    await clearCookieSession();
  }, []);
  const allowedResources = useMemo(
    () => [...convertPermissions(user?.roles ?? []), ...["/profile"]],
    [user]
  );

  const currentPermissions = useMemo(
    () => getPermissionsByResource(user?.roles ?? [], path),
    [user, path]
  );
  if (isFetching || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[300px]">
        <div className="flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <div className="text-center text-gray-600">{t("ui.loading")}</div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <ErrorPage
        errorMessage={t("ui.errorFetchingUserData")}
        onRetryReload
        onLogout={signOut}
      />
    );
  }

  if (user && !user?.active) {
    return (
      <ErrorPage
        hideRetryButton={true}
        errorMessage={t("ui.userBlocked")}
        onLogout={signOut}
      />
    );
  }
  return (
    <AuthContext.Provider
      value={{
        session,
        setSession: setSessionToken,
        signOut,
        isSignedIn: isSignedIn,
        allowedResources,
        currentPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
