import { useTranslation } from "react-i18next";
import {
  useGameSettingsMutation,
  useGlucoseProviderMutation,
  useMaintenanceMutation,
} from "@/app/api/mutations";
import {
  useGameSettings,
  useGameStats,
  useGlucoseProviderModes,
  useServiceStatus,
} from "@/app/api/queries";
import { ServiceStatus } from "@/app/api/generated-api.ts";
import { PermissionGate } from "@/app/auth/PermissionGate.tsx";
import { usePermissions } from "@/app/auth/permissions.ts";
import { Button } from "@/app/components/ui/Button.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";
import { AdminErrorNotice } from "@/app/modules/Admin/components/AdminAsyncState.tsx";

export function AdminSettingsPage() {
  const { t } = useTranslation();
  const { has } = usePermissions();
  const canReadGameSettings = has("game.settings:read");
  const canReadGlucoseSettings = has("glucose.settings:read");
  const game = useGameSettings(canReadGameSettings);
  const gameStats = useGameStats(canReadGameSettings);
  const updateGame = useGameSettingsMutation();
  const providers = useGlucoseProviderModes(canReadGlucoseSettings);
  const updateProvider = useGlucoseProviderMutation();
  const serviceStatus = useServiceStatus();
  const maintenance = useMaintenanceMutation();
  const maintenanceEnabled =
    serviceStatus.data?.status === ServiceStatus.Maintenance;

  return (
    <AdminShell
      title={t("pages.admin.settings.title")}
      description={t("pages.admin.settings.description")}
    >
      <div className="grid gap-3 lg:grid-cols-3">
        <section className="rounded-tile border border-border bg-surface p-5">
          <h2 className="text-lg font-black">
            {t("pages.admin.settings.game")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("pages.admin.settings.gameDescription")}
          </p>
          <div
            className="mt-5 divide-y divide-border rounded-control border border-border bg-surface-raised"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                {t("pages.admin.settings.currentStatus")}
              </span>
              <StatusBadge tone={game.data?.enabled ? "green" : "gray"}>
                {game.isPending
                  ? t("pages.admin.settings.statusLoading")
                  : game.isError
                    ? t("pages.admin.settings.statusError")
                    : game.data.enabled
                      ? t("pages.admin.settings.gameEnabled")
                      : t("pages.admin.settings.gameDisabled")}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                {t("pages.admin.settings.activePlayers")}
              </span>
              <span className="text-lg font-black tabular-nums text-foreground">
                {gameStats.isPending
                  ? "..."
                  : gameStats.isError
                    ? t("pages.admin.settings.playersUnavailable")
                    : gameStats.data.activePlayers}
              </span>
            </div>
          </div>
          {game.isError ? (
            <div className="mt-3">
              <AdminErrorNotice
                error={game.error}
                onRetry={() => void game.refetch()}
              />
            </div>
          ) : null}
          {gameStats.isError ? (
            <div className="mt-3">
              <AdminErrorNotice
                error={gameStats.error}
                onRetry={() => void gameStats.refetch()}
              />
            </div>
          ) : null}
          <PermissionGate permission="game.settings:update">
            <Button
              className="mt-3 w-full"
              variant={game.data?.enabled ? "secondary" : "primary"}
              disabled={game.isPending || game.isError || updateGame.isPending}
              onClick={() => updateGame.mutate(!game.data?.enabled)}
            >
              {updateGame.isPending
                ? t("pages.admin.settings.statusUpdating")
                : game.data?.enabled
                  ? t("pages.admin.settings.disableGame")
                  : t("pages.admin.settings.enableGame")}
            </Button>
            {updateGame.isError ? (
              <div className="mt-3">
                <AdminErrorNotice
                  error={updateGame.error}
                  onDismiss={updateGame.reset}
                />
              </div>
            ) : null}
          </PermissionGate>
        </section>
        <section className="rounded-tile border border-border bg-surface p-5">
          <h2 className="text-lg font-black">
            {t("pages.admin.settings.maintenance")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("pages.admin.settings.maintenanceDescription")}
          </p>
          <div
            className="mt-5 flex items-center justify-between gap-3 rounded-control border border-border bg-surface-raised px-3 py-2.5"
            aria-live="polite"
          >
            <span className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
              {t("pages.admin.settings.currentStatus")}
            </span>
            <StatusBadge tone={maintenanceEnabled ? "yellow" : "green"}>
              {serviceStatus.isPending
                ? t("pages.admin.settings.statusLoading")
                : serviceStatus.isError
                  ? t("pages.admin.settings.statusError")
                  : maintenanceEnabled
                    ? t("pages.admin.settings.maintenanceActive")
                    : t("pages.admin.settings.operational")}
            </StatusBadge>
          </div>
          {serviceStatus.isError ? (
            <div className="mt-3">
              <AdminErrorNotice
                error={serviceStatus.error}
                onRetry={() => void serviceStatus.refetch()}
              />
            </div>
          ) : null}
          <PermissionGate permission="status.maintenance:update">
            <Button
              className="mt-3 w-full"
              variant={maintenanceEnabled ? "secondary" : "primary"}
              disabled={
                serviceStatus.isPending ||
                serviceStatus.isError ||
                maintenance.isPending
              }
              onClick={() => maintenance.mutate(!maintenanceEnabled)}
            >
              {maintenance.isPending
                ? t("pages.admin.settings.statusUpdating")
                : maintenanceEnabled
                  ? t("pages.admin.settings.disableMaintenance")
                  : t("pages.admin.settings.enableMaintenance")}
            </Button>
            {maintenance.isError ? (
              <div className="mt-3">
                <AdminErrorNotice
                  error={maintenance.error}
                  onDismiss={maintenance.reset}
                />
              </div>
            ) : null}
          </PermissionGate>
        </section>
        <section className="rounded-tile border border-border bg-surface p-5">
          <h2 className="text-lg font-black">
            {t("pages.admin.settings.glucose")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("pages.admin.settings.glucoseDescription")}
          </p>
          <PermissionGate permission="glucose.settings:update">
            <div className="mt-6 grid gap-2">
              {providers.data?.providers.map((provider) => (
                <Button
                  key={provider.name}
                  variant={provider.selected ? "primary" : "secondary"}
                  disabled={updateProvider.isPending}
                  onClick={() => updateProvider.mutate(provider.name)}
                >
                  {provider.name}
                </Button>
              ))}
            </div>
          </PermissionGate>
          {providers.isError ? (
            <div className="mt-3">
              <AdminErrorNotice
                error={providers.error}
                onRetry={() => void providers.refetch()}
              />
            </div>
          ) : null}
          {updateProvider.isError ? (
            <div className="mt-3">
              <AdminErrorNotice
                error={updateProvider.error}
                onDismiss={updateProvider.reset}
              />
            </div>
          ) : null}
        </section>
      </div>
    </AdminShell>
  );
}
