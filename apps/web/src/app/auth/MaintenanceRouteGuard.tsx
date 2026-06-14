import { Outlet } from "react-router-dom";
import { useServiceStatus } from "@/app/api/queries";
import { ServiceStatus } from "@/app/api/generated-api.ts";
import { LoadingPage } from "@/app/modules/Common/Loading/Loading.page.tsx";
import { MaintenancePage } from "@/app/modules/Common/Maintenance/Maintenance.page.tsx";
import { ServerErrorPage } from "@/app/modules/Common/ServerError/ServerError.page.tsx";

export function MaintenanceRouteGuard() {
  const serviceStatus = useServiceStatus();
  const isMaintenance =
    serviceStatus.data?.status === ServiceStatus.Maintenance;

  if (serviceStatus.isPending) {
    return <LoadingPage />;
  }

  if (serviceStatus.isError) {
    return <ServerErrorPage />;
  }

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return <Outlet />;
}
