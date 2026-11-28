import { describe, expect, it } from "vitest";
import { z } from "zod";
import { mapApplicationError } from "@/server/application/errors/api-error-mapping";
import { ApplicationError } from "@/server/application/errors/application-error";
import { applicationErrorCodes } from "@/server/application/errors/error-code";
import { apiErrorSchema } from "@/shared/schemas/common/api-error.schema";

describe("mapApplicationError", () => {
  it("maps application validation failures to a safe client error", () => {
    const result = mapApplicationError(
      new ApplicationError(
        applicationErrorCodes.validation,
        "Rejected input details.",
      ),
    );

    expect(result).toEqual({
      status: 400,
      body: {
        error: {
          code: "VALIDATION_ERROR",
          message: "The request is invalid.",
        },
      },
    });
  });

  it("maps Zod errors without exposing rejected input", () => {
    let error: unknown;

    try {
      z.number().parse("sensitive-input");
    } catch (caught) {
      error = caught;
    }

    const result = mapApplicationError(
      error,
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(result).toEqual({
      status: 400,
      body: {
        error: {
          code: "VALIDATION_ERROR",
          message: "The request is invalid.",
          requestId: "550e8400-e29b-41d4-a716-446655440000",
        },
      },
    });
    expect(JSON.stringify(result)).not.toContain("sensitive-input");
    expect(apiErrorSchema.safeParse(result.body).success).toBe(true);
  });

  it("maps application failures without returning internal messages", () => {
    const result = mapApplicationError(
      new ApplicationError(
        applicationErrorCodes.forbidden,
        "Staff role details.",
      ),
    );

    expect(result).toEqual({
      status: 403,
      body: {
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to perform this action.",
        },
      },
    });
  });

  it("hides unexpected error details", () => {
    const result = mapApplicationError(new Error("Database password: secret"));

    expect(result.body.error.message).toBe("An unexpected error occurred.");
    expect(JSON.stringify(result)).not.toContain("secret");
  });
});
