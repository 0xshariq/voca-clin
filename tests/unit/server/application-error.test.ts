import { describe, expect, it } from "vitest";
import { ApplicationError } from "@/server/application/errors/application-error";
import { applicationErrorCodes } from "@/server/application/errors/error-code";

describe("ApplicationError", () => {
  it("retains a stable code and internal diagnostic message", () => {
    const error = new ApplicationError(
      applicationErrorCodes.notFound,
      "Learner record 123 was not found.",
    );

    expect(error).toMatchObject({
      name: "ApplicationError",
      code: "NOT_FOUND",
      message: "Learner record 123 was not found.",
    });
  });
});
