import type { ReactNode } from "react";
import { usePermissions } from "@/app/auth/permissions.ts";

type PermissionGateProps = {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
};

export function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { has } = usePermissions();
  return has(permission) ? children : fallback;
}
