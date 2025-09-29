"use client";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { Session } from "./auth.model";
import { AuthContext } from "./auth.context";
import { clearCookieSession, setCookieSession } from "./auth.service";
import { convertPermissions, getPermissionsByResource } from "./auth.guard";
import { usePathname } from "next/navigation";
import { useGetUserById } from "@/query/user";
import { Box, Center, Group, Loader } from "@mantine/core";
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
  );
  const user = useMemo(() => data, [data]);

  const setSessionToken = useCallback(
    (data: Session) => {
      isSignedIn.current = true;
      setSession(data);
      setCookieSession(data);
    },
    [setSession],
  );

  const session = useMemo(
    () =>
      ({
        token: storedSession?.token,
        user: data,
        account: storedSession?.account,
      }) as Session,
    [storedSession, data],
  );

  const signOut = useCallback(async () => {
    isSignedIn.current = false;
    setSession(undefined);
    await clearCookieSession();
  }, [setSession]);
  const allowedResources = useMemo(
    () => [...convertPermissions(user?.roles ?? []), ...["/profile"]],
    [user],
  );

  const currentPermissions = useMemo(
    () => getPermissionsByResource(user?.roles ?? [], path),
    [user, path],
  );
  if (isFetching || isLoading) {
    return (
      <Box className="min-h-screen" pt={300}>
        <Group justify="center">
          <Loader size="sm" />
          <Center>Loading....</Center>
        </Group>
      </Box>
    );
  }
  if (isError) {
    return (
      <ErrorPage errorMessage="Error on Fetching user data please try again!" onRetryReload onLogout={signOut} />
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
