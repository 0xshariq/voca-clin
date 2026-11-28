# Shared contracts and schemas

Keep this area limited to stable contracts that genuinely cross a client/server or external API boundary. Organize them by capability and operation; domain entities, persistence documents and feature-only view models stay with their owning module or feature.

Runtime validation uses Zod 4. Place a schema beside its contract boundary, infer the TypeScript contract from the schema where practical, and validate untrusted input before application logic uses it. Do not return domain models or persistence records directly from a public API. Avoid global barrels that re-export every contract or schema; import the specific contract or schema needed by a caller.

The common API error response demonstrates the convention: `common/api-error.schema.ts` defines the runtime shape and `common/api-error.ts` derives the corresponding type.
