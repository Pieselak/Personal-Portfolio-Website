import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type {
  FinalChallenge,
  FinalTarget,
  GameResolution,
  GameResult,
  RoomState,
  RoundState,
} from "@/app/api/game.types.ts";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:2100/";

export function useGameSocket() {
  const token = useAuthStore((state) => state.accessToken);
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState<RoomState | null>(null);
  const [round, setRound] = useState<RoundState | null>(null);
  const [resolution, setResolution] = useState<GameResolution | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [error, setError] = useState("");
  const [answerAccepted, setAnswerAccepted] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [finalChallenge, setFinalChallenge] =
    useState<FinalChallenge | null>(null);
  const [finalTarget, setFinalTarget] = useState<FinalTarget | null>(null);

  useEffect(() => {
    const namespace = new URL("/game", baseURL).toString();
    const socket = io(namespace, {
      auth: {
        token,
        playerId: sessionStorage.getItem("game-player-id") ?? undefined,
      },
      withCredentials: true,
      reconnectionDelayMax: 5000,
    });
    socketRef.current = socket;

    const onConnect = () => {
      setConnected(true);
      if (sessionStorage.getItem("game-player-id")) {
        void socket.timeout(5000).emitWithAck("room:resume").catch(() => {
          sessionStorage.removeItem("game-player-id");
        });
      }
    };
    const onDisconnect = () => setConnected(false);
    const onRoom = (state: RoomState) => setRoom(state);
    const onRound = (state: RoundState) => {
      setRound(state);
      setResolution(null);
      setAnswerAccepted(false);
      setAnswerCorrect(null);
    };
    const onResolution = (state: GameResolution) => setResolution(state);
    const onFinished = (state: GameResult) => setResult(state);
    const onFinalStarted = (state: FinalChallenge) => {
      setFinalChallenge(state);
      setFinalTarget(null);
      setRound(null);
      setResolution(null);
    };
    const onFinalTarget = (state: FinalTarget) => setFinalTarget(state);
    const onFinalProgress = (state: {
      hits: number;
      requiredHits: number;
      playerId: string;
    }) => {
      setFinalChallenge((current) =>
        current
          ? {
              ...current,
              hits: state.hits,
              requiredHits: state.requiredHits,
            }
          : current,
      );
    };
    const onError = (payload: { message?: string } | string) =>
      setError(typeof payload === "string" ? payload : payload.message ?? "");
    const onAccepted = (payload: { correct: boolean }) => {
      setAnswerAccepted(true);
      setAnswerCorrect(payload.correct);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("room:state", onRoom);
    socket.on("round:started", onRound);
    socket.on("round:resolved", onResolution);
    socket.on("game:finished", onFinished);
    socket.on("final:started", onFinalStarted);
    socket.on("final:target", onFinalTarget);
    socket.on("final:progress", onFinalProgress);
    socket.on("game:error", onError);
    socket.on("exception", onError);
    socket.on("answer:accepted", onAccepted);

    return () => {
      socket.off();
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const emit = useCallback(
    async <T,>(event: string, payload?: unknown): Promise<T> => {
      const socket = socketRef.current;
      if (!socket) throw new Error("Socket unavailable");
      setError("");
      try {
        return (await socket.timeout(6000).emitWithAck(event, payload)) as T;
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : "Request failed";
        setError(message);
        throw caught;
      }
    },
    [],
  );

  const createRoom = useCallback(
    async (payload: {
      nickname: string;
      bossUuid: string;
      language: string;
    }) => {
      const response = await emit<{ code: string; playerId: string }>(
        "room:create",
        payload,
      );
      sessionStorage.setItem("game-player-id", response.playerId);
      return response;
    },
    [emit],
  );

  const joinRoom = useCallback(
    async (payload: { nickname: string; code: string }) => {
      const response = await emit<{ code: string; playerId: string }>(
        "room:join",
        payload,
      );
      sessionStorage.setItem("game-player-id", response.playerId);
      return response;
    },
    [emit],
  );

  return {
    connected,
    room,
    round,
    resolution,
    result,
    error,
    answerAccepted,
    answerCorrect,
    finalChallenge,
    finalTarget,
    playerId: sessionStorage.getItem("game-player-id"),
    createRoom,
    joinRoom,
    setReady: (ready: boolean) => emit("player:ready", { ready }),
    startGame: () => emit("game:start"),
    nextRound: () => emit("round:next"),
    submitAnswer: (payload: {
      answerIds: string[];
      matches?: Record<string, string>;
    }) => emit("answer:submit", payload),
    strikeFinalTarget: (targetId: string) =>
      emit("final:strike", { targetId }),
  };
}
