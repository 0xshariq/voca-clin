import type { ApplicationErrorCode } from "./error-code";

export class ApplicationError extends Error {
  readonly code: ApplicationErrorCode;

  constructor(
    code: ApplicationErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApplicationError";
    this.code = code;
  }
}
