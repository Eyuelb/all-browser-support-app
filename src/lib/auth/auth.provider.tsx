"use client";
import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";
import type { Session } from "./auth.model";
import { AuthContext } from "./auth.context";
import { clearCookieSession, setCookieSession } from "./auth.service";
import { convertPermissions, getPermissionsByResource } from "./auth.guard";
import { usePathname } from "next/navigation";
import { useGetUserById } from "@/query/user";
import { Loader2 } from "lucide-react";
import ErrorPage from "@/components/common/error-page";

export const AuthProvider = ({
  children,
  session: pSession,
}: {
  children: ReactNode;
  session: Session | undefined;
}) => {
  const path = usePathname();
  const [storedSession, setSession] = useState<Session | undefined>(pSession);
  const isSignedIn = useRef<boolean>(!!pSession?.user);

  const { data, isLoading, isFetching, isError } = useGetUserById(
    pSession?.user?.id,
    !!pSession?.token?.access_token
  );
  const user = useMemo(() => data, [data]);

  console.log({ user });

  const setSessionToken = useCallback((data: Session) => {
    isSignedIn.current = true;
    setSession(data);
    setCookieSession(data);
  }, []);

  const session = useMemo(
    () =>
      ({
        token: storedSession?.token,
        user: data,
        account: storedSession?.account,
      } as Session),
    [storedSession, data]
  );

  const signOut = useCallback(async () => {
    isSignedIn.current = false;
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
          <div className="text-center text-gray-600">Loading....</div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <ErrorPage
        errorMessage="Error on Fetching user data please try again!"
        onRetryReload
        onLogout={signOut}
      />
    );
  }

  if (user && !user?.active) {
    return (
      <ErrorPage
        hideRetryButton={true}
        errorMessage="Unauthorized. User is blocked"
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
        isSignedIn: isSignedIn.current,
        allowedResources,
        currentPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
