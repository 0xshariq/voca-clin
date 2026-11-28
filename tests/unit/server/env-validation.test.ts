import { describe, expect, it } from "vitest";
import { parseServerEnvironment } from "@/server/infrastructure/config/env-schema";

describe("parseServerEnvironment", () => {
  it("applies safe defaults when optional settings are omitted", () => {
    expect(parseServerEnvironment({})).toEqual({
      NODE_ENV: "development",
      LOG_LEVEL: "info",
    });
  });

  it("accepts supported runtime and log-level settings", () => {
    expect(
      parseServerEnvironment({ NODE_ENV: "production", LOG_LEVEL: "warn" }),
    ).toEqual({ NODE_ENV: "production", LOG_LEVEL: "warn" });
  });

  it("reports invalid setting names without echoing their values", () => {
    expect(() =>
      parseServerEnvironment({ LOG_LEVEL: "private-value" }),
    ).toThrow("Invalid server environment configuration: LOG_LEVEL.");
  });
});
