import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

export type RequestContext = Readonly<{ requestId: string }>;

const requestContextStorage = new AsyncLocalStorage<RequestContext>();

export function withRequestContext<T>(operation: () => T): T {
  return requestContextStorage.run({ requestId: randomUUID() }, operation);
}

export function getRequestContext() {
  return requestContextStorage.getStore();
}
