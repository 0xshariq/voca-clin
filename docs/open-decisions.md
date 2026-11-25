# Open decisions and implementation gates

`scope.md` section 25 is authoritative for the complete issue list. This register groups its existing identifiers by gate so a proposal is not mistaken for an approval. Phase 0 does not resolve decisions that require product-owner, Ricoz/company, legal/security, academic or operational owners.

## Technical/company approval gates

| Scope ID | Decision needed | Blocks |
|---|---|---|
| APP-01 | Ricoz approval for Next.js backend exception; otherwise Express.js with unchanged domain/application boundaries | Production backend framework and deployment |
| APP-02 | Ricoz approval for Vercel-first deployment | Production hosting |
| APP-03 | Managed MongoDB provider/hosting approval; dependent search choice | Production database/search |
| APP-04 | Ricoz approval for Clerk | Production authentication |
| APP-05 | Worker hosting choice (Vercel Daemons or managed container host) | Production worker deployment |
| APP-06 | BullMQ and managed Redis candidate/provider approval | Durable queue |
| SPEC-24 | Release cadence, maintenance windows and CI/deployment tooling | Release process |
| SPEC-25 | Queue/workflow engine for approvals, work items and scheduled reports | Durable workflow/job implementation where required |

## Product and academic gates

| Scope ID | Decision needed | Blocks |
|---|---|---|
| SPEC-01 | Initial profession pathways | Launch curriculum and goal catalogs |
| SPEC-02 | English proficiency coverage | Placement, content and learning paths |
| SPEC-03 | Destination priorities | Goal/reference data and curriculum scope |
| SPEC-04 | External examination programmes | Exam-preparation curriculum and mapping |
| SPEC-06 | Evaluator qualifications and permissions | Manual evaluation policy/assignments |
| SPEC-07 | Placement methodology, validation and score interpretation | Placement outputs or level claims |
| SPEC-08 | Content review staffing and service levels | Editorial readiness |
| SPEC-15 | Whether optional AI support enters R1 | Any R1 AI task; core product remains usable without AI |
| SPEC-16 | Formal accessibility standard/compliance target | Formal compliance claims |
| SPEC-22 | R1 contributor intake method and eligibility | Contributor-submission workflow |
| SPEC-23 | Learning-achievement credential definition/criteria | Any achievement credential issuance |

## Commercial, privacy, operational and legal gates

| Scope ID | Decision needed | Blocks |
|---|---|---|
| SPEC-09 | Pricing, free-tier/usage limits, checkout/payment/refund policies | Paid commercial workflows |
| SPEC-11 | Success targets | Pilot/launch performance evaluation |
| SPEC-12 | Product name, trademark and domain | Public commercial launch as applicable |
| SPEC-17 | P0-P3 response/resolution targets and escalation timings | Operational SLA configuration |
| SPEC-18 | Staffing/coverage and sufficient eligible independent approvers | Operational readiness/dual approvals |
| SPEC-19 | Staff session inactivity and maximum lifetime values | Final session security configuration |
| SPEC-20 | Notification providers/channels | Production notification delivery |
| SPEC-21 | MFA mechanism and recovery design | Production staff authentication configuration |
| SPEC-26 | Detailed permission templates and learner visibility of significant staff access | Related permission/UI details |
| LEG-01 | Creator licensing wording and permissions | Content rights activation |
| LEG-02 | Retention periods by category | Retention/deletion schedules and production policy |
| LEG-03 | Age eligibility/minor protections | Registration eligibility/public launch |
| LEG-04 | Credential/result wording and jurisdiction obligations | Public credential/market claims |
| LEG-05 | AI provider terms, consent and model-training terms | External AI processing |
| LEG-06 | Jurisdiction-specific incident notification duties | Legal incident-response procedure |

SPEC-05, SPEC-13 and SPEC-14 remain in `scope.md` as later-release or conditional gates; they do not authorize public contributor/organization ecosystems, content-sharing expansion or proficiency credentials in R1.

## Phase 1 implementation conventions

- **Accepted for Phase 1 by the product owner:** Vitest for unit tests and Playwright for browser-level checks. The decision applies to the Phase 1 shell and does not select a runtime schema validator.
- **Still open before shared runtime schemas or production logic:** select and record the runtime validation library. TypeScript compile-time checking is not a substitute for validating untrusted input.

## Status

All entries above remain open unless the decision owner records explicit approval in this register or a linked decision record and updates `scope.md`. Documentation creation, a passing check, or inclusion in a design file is not approval. Non-blocking work may continue only when it does not depend on the unresolved item.
