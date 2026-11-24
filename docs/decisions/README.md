# Engineering decision records

Use this directory for durable decisions that affect architecture, product boundaries, operations, security or delivery. `scope.md` remains the authoritative Release 1 implementation plan; decision records explain a choice and its rationale and do not silently override product requirements.

## Recording a decision

For each material decision, record:

- Identifier and concise title.
- Status: Proposed, Accepted, Rejected, Superseded, or Open.
- Decision owner and approval type (product owner, Ricoz/company, legal/security, or technical).
- Date and affected phase/scope sections.
- Context and constraints, considered options, decision/rationale, consequences and follow-up actions.
- Any gate that remains before implementation, production deployment or public claims.

Do not mark a technical choice accepted merely because it appears in a proposal. Company approvals, legal reviews and product-owner decisions are separate. Do not invent pricing, academic standards, regulatory recognition, retention periods or service-level targets.

## Change control

1. Search this directory and `scope.md` for an existing decision before creating a record.
2. Update a superseded record's status and link the replacing decision; preserve history.
3. Update affected sections of `scope.md` and architecture docs in the same change.
4. Leave unresolved items explicitly Open and name the implementation phase they block.
5. Keep secrets and personal data out of decision records.

## Current Phase 0 register

The working register and gates are in [`open-decisions.md`](../open-decisions.md). This directory contains no accepted implementation ADRs yet. Phase 0 documentation is a review package, not evidence that every proposed architecture choice or release phase has been approved.
