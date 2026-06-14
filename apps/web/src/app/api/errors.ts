import axios from "axios";

type ApiErrorPayload = {
  message?: unknown;
  error?: unknown;
};

export type ApiErrorKind =
  | "network"
  | "unauthorized"
  | "forbidden"
  | "notFound"
  | "conflict"
  | "validation"
  | "rateLimit"
  | "server"
  | "unexpected";

function getPayloadMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const { message, error } = payload as ApiErrorPayload;

  if (Array.isArray(message)) {
    const messages = message.filter(
      (item): item is string => typeof item === "string",
    );
    return messages.length > 0 ? messages.join(" ") : undefined;
  }

  if (typeof message === "string") return message;
  return typeof error === "string" ? error : undefined;
}

export function getApiError(error: unknown): {
  kind: ApiErrorKind;
  detail?: string;
} {
  if (!axios.isAxiosError(error)) {
    return {
      kind: "unexpected",
      detail: error instanceof Error ? error.message : undefined,
    };
  }

  if (!error.response) {
    return { kind: "network" };
  }

  const detail = getPayloadMessage(error.response.data);
  const status = error.response.status;

  if (status === 401) return { kind: "unauthorized" };
  if (status === 403) return { kind: "forbidden" };
  if (status === 404) return { kind: "notFound", detail };
  if (status === 409) return { kind: "conflict", detail };
  if (status === 400 || status === 422) {
    return { kind: "validation", detail };
  }
  if (status === 429) return { kind: "rateLimit" };
  if (status >= 500) return { kind: "server" };

  return { kind: "unexpected", detail };
}
