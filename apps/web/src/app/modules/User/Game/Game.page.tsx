import {
  BookOpenCheck,
  Check,
  CircleDot,
  Clock3,
  Copy,
  Crosshair,
  Crown,
  Gamepad2,
  Hash,
  HeartPulse,
  LoaderCircle,
  Medal,
  Radio,
  RotateCcw,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
  UserRound,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { usePublicBosses } from "@/app/api/queries";
import { useGameSocket } from "@/app/api/sockets";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { IconButton } from "@/app/components/ui/IconButton.tsx";
import { MetricTile } from "@/app/components/ui/MetricTile.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { ProgressBar } from "@/app/components/ui/ProgressBar.tsx";
import { SegmentedControl } from "@/app/components/ui/SegmentedControl.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";

const featureItems = [
  { key: "knowledge", icon: BookOpenCheck },
  { key: "players", icon: Users },
  { key: "help", icon: HeartPulse },
] as const;

export function GamePage() {
  const { t, i18n } = useTranslation();
  const username = useAuthStore((state) => state.user?.username);
  const socket = useGameSocket();
  const bosses = usePublicBosses(i18n.language);
  const [nickname, setNickname] = useState(username ?? "");
  const [selectedBoss, setSelectedBoss] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [mode, setMode] = useState<"create" | "join">("create");

  const effectiveBoss = selectedBoss || bosses.data?.[0]?.uuid || "";

  async function enterRoom(event: FormEvent) {
    event.preventDefault();
    if (mode === "create") {
      await socket.createRoom({
        nickname,
        bossUuid: effectiveBoss,
        language: i18n.language,
      });
      return;
    }
    await socket.joinRoom({
      nickname,
      code: joinCode.toUpperCase(),
    });
  }

  if (socket.result) {
    return (
      <GameResultView
        result={socket.result}
        onExit={() => {
          sessionStorage.removeItem("game-player-id");
          window.location.reload();
        }}
      />
    );
  }

  if (socket.room?.phase === "PLAYING" && socket.round) {
    return (
      <BattleView
        key={`${socket.round.question.uuid}-${socket.round.round}`}
        socket={socket}
      />
    );
  }

  if (socket.room?.phase === "FINAL" && socket.finalChallenge) {
    return <FinalBattleView socket={socket} />;
  }

  if (socket.room) {
    return <LobbyView socket={socket} />;
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.game.title")}
        subtitle={t("pages.user.game.subtitle")}
      />

      <Reveal>
        <section className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(21rem,0.9fr)]">
          <BentoTile className="h-fit overflow-hidden p-5 md:p-7">
            <div>
              <div className="flex items-center justify-between gap-4">
                <StatusBadge tone="red">
                  {t("pages.user.game.eyebrow")}
                </StatusBadge>
                <span className="flex size-11 items-center justify-center rounded-control border border-border bg-surface-inset text-primary">
                  <Gamepad2 className="size-5" />
                </span>
              </div>
              <h2 className="mt-8 max-w-3xl text-4xl font-black leading-[1.04] text-foreground md:text-6xl">
                {t("pages.user.game.hero")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                {t("pages.user.game.intro")}
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {featureItems.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex min-h-32 flex-col justify-between rounded-tile border border-border bg-surface-inset p-4"
                >
                  <Icon className="size-5 text-primary" />
                  <p className="text-sm font-black leading-5 text-foreground">
                    {t(`pages.user.game.features.${key}`)}
                  </p>
                </div>
              ))}
            </div>

            <Notice
              className="mt-4"
              title={t("pages.user.game.disclaimerTitle")}
            >
              {t("pages.user.game.disclaimer")}
            </Notice>
          </BentoTile>

          <BentoTile
            eyebrow={t("pages.user.game.setupEyebrow")}
            title={t("pages.user.game.setupTitle")}
            description={t("pages.user.game.setupDescription")}
            className="h-fit"
          >
            <form onSubmit={enterRoom} className="space-y-4">
              <SegmentedControl
                ariaLabel={t("pages.user.game.modeLabel")}
                value={mode}
                onChange={setMode}
                mobileLayout="stack"
                options={[
                  {
                    value: "create",
                    label: t("pages.user.game.create"),
                    icon: <Swords className="size-4" />,
                  },
                  {
                    value: "join",
                    label: t("pages.user.game.join"),
                    icon: <Users className="size-4" />,
                  },
                ]}
              />

              <GameInput
                label={t("pages.user.game.nickname")}
                value={nickname}
                onChange={setNickname}
                icon={<UserRound className="size-4" />}
                minLength={2}
                maxLength={40}
              />

              {mode === "create" ? (
                <div className="space-y-2">
                  <p className="text-sm font-black text-foreground">
                    {t("pages.user.game.selectBoss")}
                  </p>
                  {bosses.isLoading && (
                    <div className="flex min-h-28 items-center justify-center rounded-tile border border-border bg-surface-inset text-muted-foreground">
                      <LoaderCircle className="mr-2 size-5 animate-spin" />
                      <span className="text-sm font-bold">
                        {t("pages.user.game.loadingBosses")}
                      </span>
                    </div>
                  )}
                  {bosses.isError && (
                    <Notice tone="red">
                      {t("pages.user.game.bossesError")}
                    </Notice>
                  )}
                  {bosses.data?.map((boss, index) => {
                    const active = effectiveBoss === boss.uuid;
                    return (
                      <button
                        type="button"
                        key={boss.uuid}
                        aria-pressed={active}
                        onClick={() => setSelectedBoss(boss.uuid)}
                        className={`group w-full rounded-tile border p-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                          active
                            ? "border-border-strong bg-surface-raised"
                            : "border-border bg-surface hover:border-ring hover:bg-surface-raised"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex size-10 shrink-0 items-center justify-center rounded-control border ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-surface-inset text-muted-foreground"
                            }`}
                          >
                            {active ? (
                              <Check className="size-4" />
                            ) : (
                              <span className="text-sm font-black">
                                {index + 1}
                              </span>
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-black text-foreground">
                              {boss.name}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                              {boss.description}
                            </span>
                            <span className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-muted-foreground">
                              <span className="rounded-control border border-border bg-surface-inset px-2 py-1">
                                {boss.maxRounds}{" "}
                                {t("pages.user.game.roundsLabel")}
                              </span>
                              <span className="rounded-control border border-border bg-surface-inset px-2 py-1">
                                {boss.questionCount}{" "}
                                {t("pages.user.game.questionsLabel")}
                              </span>
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <GameInput
                  label={t("pages.user.game.roomCode")}
                  value={joinCode}
                  onChange={(value) => setJoinCode(value.toUpperCase())}
                  icon={<Hash className="size-4" />}
                  minLength={6}
                  maxLength={6}
                  inputClassName="font-mono uppercase tracking-[0.22em]"
                />
              )}

              {socket.error && <Notice tone="red">{socket.error}</Notice>}

              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <Wifi className="size-4" />
                {socket.connected
                  ? t("pages.user.game.connected")
                  : t("pages.user.game.connecting")}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={
                  !socket.connected || (mode === "create" && !effectiveBoss)
                }
              >
                {mode === "create" ? (
                  <ShieldCheck className="size-4" />
                ) : (
                  <Radio className="size-4" />
                )}
                {mode === "create"
                  ? t("pages.user.game.createAction")
                  : t("pages.user.game.joinAction")}
              </Button>
            </form>
          </BentoTile>
        </section>
      </Reveal>
    </PageShell>
  );
}

type BattleSocket = ReturnType<typeof useGameSocket>;

function LobbyView({ socket }: { socket: BattleSocket }) {
  const { t } = useTranslation();
  const room = socket.room!;
  const currentPlayer = room.players.find(
    (player) => player.id === socket.playerId,
  );
  const isHost = room.hostId === socket.playerId;
  const readyPlayers = room.players.filter((player) => player.ready).length;

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.game.lobby.title")}
        subtitle={t("pages.user.game.lobby.subtitle")}
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <BentoTile>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t("pages.user.game.lobby.roomCode")}
              </p>
              <h2 className="font-mono text-3xl font-black tracking-[0.16em] text-foreground md:text-4xl">
                {room.code}
              </h2>
            </div>
            <IconButton
              aria-label={t("pages.user.game.lobby.copyCode")}
              icon={<Copy className="size-4" />}
              onClick={() => navigator.clipboard.writeText(room.code)}
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <MetricTile
              label={t("pages.user.game.lobby.players")}
              value={`${room.players.length}/3`}
              icon={Users}
            />
            <MetricTile
              label={t("pages.user.game.lobby.readyCount")}
              value={`${readyPlayers}/${room.players.length}`}
              tone={readyPlayers === room.players.length ? "green" : "yellow"}
              icon={Check}
            />
          </div>

          <div className="space-y-2">
            {room.players.map((player) => (
              <div
                key={player.id}
                className="flex min-h-16 items-center justify-between gap-3 rounded-tile border border-border bg-surface-inset p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-surface text-primary">
                    {player.id === room.hostId ? (
                      <Crown className="size-4" />
                    ) : (
                      <UserRound className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-black text-foreground">
                      {player.nickname}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground">
                      {player.id === room.hostId
                        ? t("pages.user.game.lobby.host")
                        : t("pages.user.game.lobby.player")}
                    </p>
                  </div>
                </div>
                <StatusBadge tone={player.ready ? "green" : "yellow"}>
                  {player.ready
                    ? t("pages.user.game.lobby.ready")
                    : t("pages.user.game.lobby.waiting")}
                </StatusBadge>
              </div>
            ))}
          </div>
        </BentoTile>

        <BentoTile
          eyebrow={t("pages.user.game.lobby.status")}
          title={t("pages.user.game.lobby.preparation")}
          description={t("pages.user.game.lobby.instructions")}
          className="h-fit"
        >
          <div className="rounded-tile border border-border bg-surface-inset p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-control border border-border bg-surface text-primary">
                <Clock3 className="size-5" />
              </span>
              <div>
                <p className="font-black text-foreground">25 s</p>
                <p className="text-xs font-bold text-muted-foreground">
                  {t("pages.user.game.lobby.answerTime")}
                </p>
              </div>
            </div>
          </div>

          <Button
            className="mt-4 w-full"
            variant={currentPlayer?.ready ? "secondary" : "primary"}
            onClick={() => socket.setReady(!currentPlayer?.ready)}
          >
            {currentPlayer?.ready ? (
              <RotateCcw className="size-4" />
            ) : (
              <Check className="size-4" />
            )}
            {currentPlayer?.ready
              ? t("pages.user.game.lobby.notReadyAction")
              : t("pages.user.game.lobby.readyAction")}
          </Button>

          {isHost && (
            <Button
              className="mt-2 w-full"
              variant="primary"
              disabled={room.players.some((player) => !player.ready)}
              onClick={() => socket.startGame()}
            >
              <Swords className="size-4" />
              {t("pages.user.game.lobby.start")}
            </Button>
          )}
        </BentoTile>
      </section>
    </PageShell>
  );
}

function BattleView({ socket }: { socket: BattleSocket }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [remaining, setRemaining] = useState(25);
  const question = socket.round?.question;

  useEffect(() => {
    if (!socket.round || socket.answerAccepted) return;
    const update = () =>
      setRemaining(
        Math.max(0, Math.ceil((socket.round!.deadline - Date.now()) / 1000)),
      );
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [socket.answerAccepted, socket.round]);

  const orderedAnswers = useMemo(() => {
    if (!question || question.type !== "ORDER") return [];
    return selected
      .map((uuid) => question.answers.find((answer) => answer.uuid === uuid))
      .filter(Boolean);
  }, [question, selected]);

  if (!question || !socket.room) return null;
  const hpPercent =
    socket.room.bossMaxHp > 0
      ? (socket.room.bossHp / socket.room.bossMaxHp) * 100
      : 100;
  const teamScore = socket.room.players.reduce(
    (sum, player) => sum + player.score,
    0,
  );
  const isHost = socket.room.hostId === socket.playerId;
  const isLastRound =
    socket.round?.round === socket.round?.totalRounds;

  async function submit() {
    await socket.submitAnswer({ answerIds: selected, matches });
  }

  return (
    <PageShell>
      <section className="grid gap-3 md:grid-cols-[minmax(0,1fr)_10rem_10rem]">
        <BentoTile className="border-red-border bg-red-bg">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-control border border-red-border bg-surface text-red-text">
                <Swords className="size-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-red-text">
                  {t("pages.user.game.battle.boss")}
                </p>
                <p className="mt-1 font-black text-foreground">
                  {t("pages.user.game.battle.bossHealth")}
                </p>
              </div>
            </div>
            <strong className="text-sm text-red-text">
              {socket.room.bossHp}/{socket.room.bossMaxHp} HP
            </strong>
          </div>
          <div className="mt-4">
            <ProgressBar value={hpPercent} tone="red" />
          </div>
        </BentoTile>

        <MetricTile
          label={t("pages.user.game.battle.time")}
          value={remaining}
          unit={t("pages.user.game.battle.seconds")}
          tone={remaining <= 5 ? "red" : remaining <= 10 ? "yellow" : "gray"}
          icon={Clock3}
        />
        <MetricTile
          label={t("pages.user.game.battle.teamScore")}
          value={teamScore}
          unit="PTS"
          tone="green"
          icon={Zap}
        />
      </section>

      <BentoTile className="p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge tone="gray">
            {t("pages.user.game.battle.round", {
              current: socket.round?.round,
              total: socket.round?.totalRounds,
            })}
          </StatusBadge>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
            <Target className="size-4" />
            {question.category}
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-2xl font-black leading-tight text-foreground md:text-4xl">
          {question.content}
        </h1>

        {question.type === "MATCHING" ? (
          <div className="mt-6 grid gap-3">
            {question.answers.map((answer) => (
              <label
                key={answer.uuid}
                className="grid gap-3 rounded-tile border border-border bg-surface-inset p-4 md:grid-cols-[1fr_14rem] md:items-center"
              >
                <strong className="text-foreground">{answer.content}</strong>
                <input
                  value={matches[answer.uuid] ?? ""}
                  disabled={socket.answerAccepted || Boolean(socket.resolution)}
                  onChange={(event) =>
                    setMatches((current) => ({
                      ...current,
                      [answer.uuid]: event.target.value,
                    }))
                  }
                  placeholder={t("pages.user.game.battle.match")}
                  className="min-h-11 rounded-control border border-border bg-surface px-3 text-foreground outline-none transition-colors focus:border-ring"
                />
              </label>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.answers.map((answer, index) => {
              const active = selected.includes(answer.uuid);
              const order = selected.indexOf(answer.uuid) + 1;
              return (
                <button
                  type="button"
                  key={answer.uuid}
                  disabled={socket.answerAccepted || Boolean(socket.resolution)}
                  aria-pressed={active}
                  onClick={() =>
                    setSelected((current) => {
                      if (question.type === "ORDER") {
                        return current.includes(answer.uuid)
                          ? current.filter((uuid) => uuid !== answer.uuid)
                          : [...current, answer.uuid];
                      }
                      return [answer.uuid];
                    })
                  }
                  className={`group flex min-h-24 items-start gap-3 rounded-tile border p-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed ${
                    active
                      ? "border-border-strong bg-surface-raised"
                      : "border-border bg-surface-inset hover:border-ring hover:bg-surface-raised"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-control border text-sm font-black ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {question.type === "ORDER" && active ? (
                      order
                    ) : active ? (
                      <Check className="size-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="pt-1.5 font-bold leading-6 text-foreground">
                    {answer.content}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {orderedAnswers.length > 0 && (
          <div className="mt-4 rounded-tile border border-border bg-surface-inset p-3 text-sm font-bold text-muted-foreground">
            {orderedAnswers.map((answer) => answer?.content).join(" -> ")}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <CircleDot className="size-4" />
            {socket.resolution
              ? t("pages.user.game.battle.reviewReady")
              : socket.answerAccepted
                ? t("pages.user.game.battle.waitingForPlayers")
                : t("pages.user.game.battle.chooseAnswer")}
          </div>
          <Button
            variant="primary"
            className="min-w-48"
            disabled={
              socket.resolution
                ? !isHost
                : socket.answerAccepted ||
                  remaining === 0 ||
                  (question.type === "MATCHING"
                    ? Object.keys(matches).length !== question.answers.length
                    : selected.length === 0)
            }
            onClick={() =>
              socket.resolution && isHost ? socket.nextRound() : submit()
            }
          >
            {socket.resolution ? (
              isHost ? (
                isLastRound ? (
                  <Crosshair className="size-4" />
                ) : (
                  <Swords className="size-4" />
                )
              ) : (
                <Clock3 className="size-4" />
              )
            ) : (
              <Zap className="size-4" />
            )}
            {socket.resolution
              ? isHost
                ? isLastRound
                  ? t("pages.user.game.battle.startFinal")
                  : t("pages.user.game.battle.nextRound")
                : t("pages.user.game.battle.waitForHost")
              : socket.answerAccepted
                ? t("pages.user.game.battle.waiting")
                : t("pages.user.game.battle.answer")}
          </Button>
        </div>
      </BentoTile>

      {socket.answerCorrect !== null && (
        <Notice
          tone={socket.answerCorrect ? "green" : "red"}
          title={
            socket.answerCorrect
              ? t("pages.user.game.battle.correct")
              : t("pages.user.game.battle.incorrect")
          }
        >
          {socket.answerCorrect
            ? t("pages.user.game.battle.correctDescription")
            : t("pages.user.game.battle.incorrectDescription")}
        </Notice>
      )}

      {socket.resolution && (
        <Notice title={t("pages.user.game.battle.explanation")}>
          {socket.resolution.explanation}
        </Notice>
      )}
    </PageShell>
  );
}

function FinalBattleView({ socket }: { socket: BattleSocket }) {
  const { t } = useTranslation();
  const challenge = socket.finalChallenge!;
  const room = socket.room!;
  const [remaining, setRemaining] = useState(0);
  const [hitTargetId, setHitTargetId] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setRemaining(Math.max(0, challenge.endsAt - Date.now()));
    update();
    const timer = window.setInterval(update, 100);
    return () => window.clearInterval(timer);
  }, [challenge.endsAt]);

  const hitPercent =
    challenge.requiredHits > 0
      ? (challenge.hits / challenge.requiredHits) * 100
      : 0;
  const weaknessPercent =
    room.bossMaxHp > 0
      ? 100 - (room.bossHp / room.bossMaxHp) * 100
      : 0;

  async function strike() {
    if (!socket.finalTarget || hitTargetId === socket.finalTarget.id) return;
    await socket.strikeFinalTarget(socket.finalTarget.id);
    setHitTargetId(socket.finalTarget.id);
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.game.final.title")}
        subtitle={t("pages.user.game.final.subtitle")}
      />

      <section className="grid gap-3 md:grid-cols-3">
        <MetricTile
          label={t("pages.user.game.final.time")}
          value={(remaining / 1000).toFixed(1)}
          unit="s"
          tone={remaining <= 5000 ? "red" : "yellow"}
          icon={Clock3}
        />
        <MetricTile
          label={t("pages.user.game.final.weakness")}
          value={Math.round(weaknessPercent)}
          unit="%"
          tone="green"
          icon={ShieldCheck}
        />
        <MetricTile
          label={t("pages.user.game.final.hits")}
          value={`${challenge.hits}/${challenge.requiredHits}`}
          tone="red"
          icon={Crosshair}
        />
      </section>

      <BentoTile className="overflow-hidden p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <StatusBadge tone="red">
              {t("pages.user.game.final.eyebrow")}
            </StatusBadge>
            <h1 className="mt-3 text-2xl font-black text-foreground md:text-4xl">
              {t("pages.user.game.final.instruction")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t("pages.user.game.final.difficulty", {
                hits: challenge.requiredHits,
                lifetime: (challenge.targetLifetime / 1000).toFixed(2),
              })}
            </p>
          </div>
          <div className="min-w-52">
            <ProgressBar value={hitPercent} tone="red" />
          </div>
        </div>

        <div className="relative min-h-[28rem] overflow-hidden rounded-tile border border-red-border bg-red-bg">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.14em] text-red-text">
            <span>{t("pages.user.game.final.arena")}</span>
            <span>{t("pages.user.game.final.teamHint")}</span>
          </div>

          {socket.finalTarget && remaining > 0 && (
            <button
              type="button"
              aria-label={t("pages.user.game.final.target")}
              disabled={hitTargetId === socket.finalTarget.id}
              onClick={strike}
              style={{
                left: `${socket.finalTarget.x}%`,
                top: `${socket.finalTarget.y}%`,
              }}
              className="absolute z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-red-text bg-surface text-red-text shadow-[0_0_0_8px_color-mix(in_srgb,var(--color-red-text)_18%,transparent)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:scale-75 disabled:opacity-35"
            >
              <Crosshair className="size-8" />
            </button>
          )}
        </div>
      </BentoTile>
    </PageShell>
  );
}

function GameResultView({
  result,
  onExit,
}: {
  result: NonNullable<BattleSocket["result"]>;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const topScore = Math.max(...result.players.map((player) => player.score));

  return (
    <PageShell>
      <BentoTile
        className={
          result.victory
            ? "border-green-border bg-green-bg"
            : "border-red-border bg-red-bg"
        }
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span
              className={`flex size-12 items-center justify-center rounded-control border bg-surface ${
                result.victory
                  ? "border-green-border text-green-text"
                  : "border-red-border text-red-text"
              }`}
            >
              {result.victory ? (
                <Trophy className="size-6" />
              ) : (
                <ShieldCheck className="size-6" />
              )}
            </span>
            <h1 className="mt-6 text-4xl font-black text-foreground md:text-5xl">
              {result.victory
                ? t("pages.user.game.result.victory")
                : t("pages.user.game.result.defeat")}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t("pages.user.game.result.description")}
            </p>
          </div>
          <StatusBadge tone={result.victory ? "green" : "red"}>
            {result.victory
              ? t("pages.user.game.result.completed")
              : t("pages.user.game.result.tryAgain")}
          </StatusBadge>
        </div>
      </BentoTile>

      <div className="grid gap-3 md:grid-cols-3">
        {result.players.map((player) => (
          <BentoTile key={player.id} className="min-h-52">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-control border border-border bg-surface-inset text-primary">
                  {player.score === topScore ? (
                    <Medal className="size-5" />
                  ) : (
                    <UserRound className="size-5" />
                  )}
                </span>
                {player.score === topScore && (
                  <StatusBadge tone="yellow">
                    {t("pages.user.game.result.topScore")}
                  </StatusBadge>
                )}
              </div>
              <div>
                <h2 className="truncate text-lg font-black text-foreground">
                  {player.nickname}
                </h2>
                <p className="mt-3 text-4xl font-black leading-none text-foreground">
                  {player.score}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {t("pages.user.game.result.points")}
                </p>
                <p className="mt-4 text-sm font-bold text-muted-foreground">
                  {t("pages.user.game.result.correctAnswers", {
                    correct: player.correctAnswers,
                    total: player.totalAnswers,
                  })}
                </p>
              </div>
            </div>
          </BentoTile>
        ))}
      </div>

      <Button variant="primary" className="w-full sm:w-auto" onClick={onExit}>
        <RotateCcw className="size-4" />
        {t("pages.user.game.result.playAgain")}
      </Button>
    </PageShell>
  );
}

type GameInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  minLength: number;
  maxLength: number;
  inputClassName?: string;
};

function GameInput({
  label,
  value,
  onChange,
  icon,
  minLength,
  maxLength,
  inputClassName = "",
}: GameInputProps) {
  return (
    <label className="grid gap-2 text-sm font-black text-foreground">
      {label}
      <span className="flex min-h-11 items-center rounded-control border border-border bg-surface transition-colors focus-within:border-ring">
        <span className="flex size-10 shrink-0 items-center justify-center text-muted-foreground">
          {icon}
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          minLength={minLength}
          maxLength={maxLength}
          required
          aria-label={label}
          className={`min-h-10 w-full bg-transparent pr-3 text-sm font-bold text-foreground outline-none placeholder:text-muted-foreground ${inputClassName}`}
        />
      </span>
    </label>
  );
}
