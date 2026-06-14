import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ADMIN_PERMISSIONS, usePermissions } from "@/app/auth/permissions.ts";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";

type AdminRouteGuardProps = {
  children: ReactNode;
  permissions?: readonly string[];
};

export function AdminRouteGuard({
  children,
  permissions = ADMIN_PERMISSIONS,
}: AdminRouteGuardProps) {
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { hasAny } = usePermissions();

  if (!isLoggedIn) {
    return (
      <Navigate replace to="/login" state={{ redirect: location.pathname }} />
    );
  }

  if (!hasAny(permissions)) {
    return <Navigate replace to="/home" />;
  }

  return children;
}
