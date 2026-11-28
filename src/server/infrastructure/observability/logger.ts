import "server-only";

import { getServerEnvironment } from "@/server/infrastructure/config/env";
import { getRequestContext } from "./request-context";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Readonly<{
  operation?: string;
  routeTemplate?: string;
  statusCode?: number;
  durationMs?: number;
  errorCode?: string;
}>;

const logLevelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const sensitiveField =
  /(authorization|cookie|email|password|secret|token|payload|content)/i;

function writeLog(level: LogLevel, event: string, context: LogContext = {}) {
  const minimumLevel = getServerEnvironment().LOG_LEVEL;

  if (logLevelPriority[level] < logLevelPriority[minimumLevel]) {
    return;
  }

  const requestId = getRequestContext()?.requestId;
  const safeContext = Object.fromEntries(
    Object.entries(context).filter(([key]) => !sensitiveField.test(key)),
  );
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...(requestId ? { requestId } : {}),
    ...safeContext,
  };
  const output = JSON.stringify(entry);

  if (level === "error") {
    console.error(output);
  } else if (level === "warn") {
    console.warn(output);
  } else if (level === "debug") {
    console.debug(output);
  } else {
    console.info(output);
  }
}

export const logger = {
  debug: (event: string, context?: LogContext) =>
    writeLog("debug", event, context),
  info: (event: string, context?: LogContext) =>
    writeLog("info", event, context),
  warn: (event: string, context?: LogContext) =>
    writeLog("warn", event, context),
  error: (event: string, context?: LogContext) =>
    writeLog("error", event, context),
};
