import { z } from "zod";

const serverEnvironmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

export function parseServerEnvironment(
  environment: Record<string, string | undefined>,
): ServerEnvironment {
  const result = serverEnvironmentSchema.safeParse({
    NODE_ENV: environment.NODE_ENV,
    LOG_LEVEL: environment.LOG_LEVEL,
  });

  if (!result.success) {
    const invalidKeys = [
      ...new Set(result.error.issues.map((issue) => issue.path[0])),
    ]
      .filter((key): key is string => typeof key === "string")
      .join(", ");

    throw new Error(
      `Invalid server environment configuration: ${invalidKeys}.`,
    );
  }

  return result.data;
}
