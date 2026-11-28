import { z } from "zod";
import type { ApiErrorResponse } from "@/shared/contracts/common/api-error";
import { apiErrorSchema } from "@/shared/schemas/common/api-error.schema";
import { ApplicationError } from "./application-error";
import { type ApplicationErrorCode, applicationErrorCodes } from "./error-code";

const publicErrors: Record<
  ApplicationErrorCode,
  { status: number; message: string }
> = {
  [applicationErrorCodes.validation]: {
    status: 400,
    message: "The request is invalid.",
  },
  [applicationErrorCodes.unauthenticated]: {
    status: 401,
    message: "Authentication is required.",
  },
  [applicationErrorCodes.forbidden]: {
    status: 403,
    message: "You do not have permission to perform this action.",
  },
  [applicationErrorCodes.notFound]: {
    status: 404,
    message: "The requested resource was not found.",
  },
  [applicationErrorCodes.conflict]: {
    status: 409,
    message: "The request conflicts with the current resource state.",
  },
  [applicationErrorCodes.internal]: {
    status: 500,
    message: "An unexpected error occurred.",
  },
};

export function mapApplicationError(
  error: unknown,
  requestId?: string,
): { status: number; body: ApiErrorResponse } {
  const code =
    error instanceof z.ZodError
      ? applicationErrorCodes.validation
      : error instanceof ApplicationError
        ? error.code
        : applicationErrorCodes.internal;
  const response = publicErrors[code];
  const safeRequestId =
    requestId && z.uuid().safeParse(requestId).success ? requestId : undefined;
  const body = apiErrorSchema.parse({
    error: {
      code,
      message: response.message,
      ...(safeRequestId ? { requestId: safeRequestId } : {}),
    },
  });

  return { status: response.status, body };
}
