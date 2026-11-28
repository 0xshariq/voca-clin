import type { z } from "zod";
import type { apiErrorSchema } from "@/shared/schemas/common/api-error.schema";

export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
