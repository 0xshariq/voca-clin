export const applicationErrorCodes = {
  validation: "VALIDATION_ERROR",
  unauthenticated: "UNAUTHENTICATED",
  forbidden: "FORBIDDEN",
  notFound: "NOT_FOUND",
  conflict: "CONFLICT",
  internal: "INTERNAL_ERROR",
} as const;

export type ApplicationErrorCode =
  (typeof applicationErrorCodes)[keyof typeof applicationErrorCodes];
