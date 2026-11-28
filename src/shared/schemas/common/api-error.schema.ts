import { z } from "zod";

export const apiErrorSchema = z.strictObject({
  error: z.strictObject({
    code: z.string().min(1).max(64),
    message: z.string().min(1).max(200),
    requestId: z.uuid().optional(),
  }),
});
