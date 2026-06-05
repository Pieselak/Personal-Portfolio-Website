import { isAxiosError } from "axios";

export function getAuthRequestError(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "invalidCredentials";
    }

    if (error.response?.status === 409) {
      return "accountExists";
    }
  }

  return "server";
}
