import { describe, expect, it } from "vitest";
import {
  getRequestContext,
  withRequestContext,
} from "@/server/infrastructure/observability/request-context";

describe("request context", () => {
  it("isolates UUID correlation identifiers across concurrent async requests", async () => {
    const contexts = await Promise.all(
      Array.from({ length: 2 }, () =>
        withRequestContext(async () => {
          const requestId = getRequestContext()?.requestId;
          await Promise.resolve();

          return {
            requestId,
            continuedRequestId: getRequestContext()?.requestId,
          };
        }),
      ),
    );

    expect(contexts[0]?.requestId).toMatch(/^[0-9a-f-]{36}$/i);
    expect(contexts[0]?.continuedRequestId).toBe(contexts[0]?.requestId);
    expect(contexts[1]?.continuedRequestId).toBe(contexts[1]?.requestId);
    expect(contexts[0]?.requestId).not.toBe(contexts[1]?.requestId);
  });
});
