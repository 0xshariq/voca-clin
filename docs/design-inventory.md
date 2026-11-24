# Design inventory and route mapping

This is a Phase 0 working inventory of the supplied UX Pilot website designs. `scope.md` determines Release 1 functionality; a mockup alone never authorizes a feature. All 34 desktop and 34 mobile files are treated as paired responsive references for website routes, not native mobile applications. Confirm the proposed route names and release mapping with the product owner before Phase 1 builds screens.

`designs/design-system.png` is the visual source of truth. It specifies the VocaClin teal brand color, Ink/Soft Teal/Canvas surfaces, typography (Plus Jakarta Sans headings and Inter body), spacing, component states, accessible contrast/focus, experience-specific navigation, privacy and responsive behavior. Use it alongside the screen reference; do not invent an incompatible visual language.

## Proposed Release 1 route mapping

Routes below are proposed URL targets (route-group names do not appear in URLs), mapped from screen labels and the existing route-group roots. They must be approved before route implementation.

| Experience | Design screen | Desktop file | Mobile file | Proposed route | Release 1 treatment |
|---|---|---|---|---|---|
| Learner | Dashboard | `desktop/learner/dashboard.png` | `mobile/learner/dasboard.png` | `/learn` | R1 learner home; mobile filename typo noted below |
| Learner | Learning goals | `desktop/learner/learning-goals.png` | `mobile/learner/learning-goals.png` | `/learn/goals` | R1 |
| Learner | Library | `desktop/learner/library.png` | `mobile/learner/library.png` | `/learn/library` | R1, available platform-owned learning/examination discovery only |
| Learner | Learning | `desktop/learner/learning.png` | `mobile/learner/learning.png` | `/learn/courses/[courseId]` | R1 course/lesson delivery; exact hierarchy TBD |
| Learner | Practice | `desktop/learner/practice.png` | `mobile/learner/practice.png` | `/learn/practice` | R1 practice |
| Learner | Assessment | `desktop/learner/assessment.png` | `mobile/learner/assessment.png` | `/learn/assessments/[assessmentId]` | R1 assessment attempt; confirm exam versus placement semantics |
| Learner | Feedback | `desktop/learner/feedback.png` | `mobile/learner/feedback.png` | `/learn/results/[attemptId]` | R1 result/feedback; result route convention TBD |
| Learner | Progress | `desktop/learner/progress.png` | `mobile/learner/progress.png` | `/learn/progress` | R1 skill-wise evidence/progress |
| Learner | Credentials | `desktop/learner/credentials.png` | `mobile/learner/credentials.png` | `/learn/credentials` | R1 course-completion records only; no proficiency credential issuance |
| Learner | Profile and settings | `desktop/learner/profile-and-settings.png` | `mobile/learner/profile-and-settings.png` | `/learn/settings` | R1 account/profile/settings; exact profile split TBD |
| Institution | Dashboard | `desktop/institution/dashboard.png` | `mobile/institution/dashboard.png` | `/institution` | R1 institution home |
| Institution | Members | `desktop/institution/members.png` | `mobile/institution/members.png` | `/institution/members` | R1 membership/roles within approved permissions |
| Institution | Cohorts | `desktop/institution/cohorts.png` | `mobile/institution/cohorts.png` | `/institution/cohorts` | R1 basic cohort management |
| Institution | Assignments | `desktop/institution/assignments.png` | `mobile/institution/assignments.png` | `/institution/assignments` | R1 platform learning/exam assignments |
| Institution | Learning activities | `desktop/institution/learning-activities.png` | `mobile/institution/learning-activities.png` | `/institution/learning-activities` | R1 authorized aggregated learner/cohort activity |
| Institution | Examinations | `desktop/institution/examinations.png` | `mobile/institution/examinations.png` | `/institution/examinations` | R1 private exam creation/assignment/results |
| Institution | Reports | `desktop/institution/reports.png` | `mobile/institution/reports.png` | `/institution/reports` | R1 basic authorized reports |
| Institution | Settings | `desktop/institution/settings.png` | `mobile/institution/settings.png` | `/institution/settings` | R1 organization settings |
| Platform Operations | Overview | `desktop/admin/overview.png` | `mobile/admin/overview.png` | `/admin` | R1 staff workspace; role-specific information and permissions required |
| Platform Operations | User management | `desktop/admin/user-management.png` | `mobile/admin/user-management.png` | `/admin/users` | R1 operational workflow; exact staff role/access matrix governs |
| Platform Operations | Organization management | `desktop/admin/organization-management.png` | `mobile/admin/organization-management.png` | `/admin/organizations` | R1 operational workflow |
| Platform Operations | Curriculum and content management | `desktop/admin/curriculum-and-content-management.png` | `mobile/admin/curriculum-and-content-management.png` | `/admin/content` | R1 controlled content lifecycle |
| Platform Operations | Examination governance | `desktop/admin/examination-governance-management.png` | `mobile/admin/examination-governance.png` | `/admin/examinations` | R1 governance of platform-owned exams/content; verify eight-area grouping |
| Platform Operations | Credential management | `desktop/admin/credential-management.png` | `mobile/admin/credential-management.png` | `/admin/credentials` | R1 issuer-aware course-completion records; no proficiency credential issuance |
| Platform Operations | Audit and oversight | `desktop/admin/audit-and-oversight-management.png` | `mobile/admin/audit-and-oversight-management.png` | `/admin/audit` | R1 independent, read-only oversight; privacy boundaries apply |
| Platform Operations | Trust and safety | `desktop/admin/trust-and-safety-management.png` | `mobile/admin/trust-and-safety-management.png` | `/admin/trust-safety` | R1 governed case workflow; role and dual-approval controls apply |
| Platform Operations | Activity monitoring | `desktop/admin/activity-monitoring-management.png` | `mobile/admin/activity-monitoring-management.png` | `/admin/activity` | R1 operations; purpose/access and private-data safeguards TBD |
| Platform Operations | Analytics and reporting | `desktop/admin/analytics-and-reporting-management.png` | `mobile/admin/analytics-and-reporting-management.png` | `/admin/analytics` | R1 privacy-guarded operational analytics |

## Later-release or conditional concepts

These six contributor screens are present in both device folders, but the R1 scope explicitly excludes public contributor registration, verification, profiles, public discovery and general publishing. Do not implement them as a public contributor portal in R1. R1 includes only narrow administrator-side handling of contributor-submitted examination material; the intake mechanism and eligibility remain open. Whether any staff-only workflow can reuse part of a contributor design requires product review.

| Experience | Design screen | Desktop file | Mobile file | Candidate route | Release 1 treatment |
|---|---|---|---|---|---|
| Contributor | Dashboard | `desktop/contributor/dashboard.png` | `mobile/contributor/dashboard.png` | `/contributor` | Defer public experience |
| Contributor | Create content | `desktop/contributor/create-content.png` | `mobile/contributor/create-content.png` | `/contributor/content/new` | Defer public submission UI; staff intake method open |
| Contributor | Submissions | `desktop/contributor/submissions.png` | `mobile/contributor/submissions.png` | `/contributor/submissions` | Defer public contributor workflow |
| Contributor | Content management | `desktop/contributor/content-management.png` | `mobile/contributor/content-management.png` | `/contributor/content` | Defer public publishing/management |
| Contributor | Contribution history | `desktop/contributor/contribution-history.png` | `mobile/contributor/contribution-history.png` | `/contributor/history` | Defer public contributor profile/history |
| Contributor | Profile and settings | `desktop/contributor/profile-and-settings.png` | `mobile/contributor/profile-and-settings.png` | `/contributor/settings` | Defer public contributor account experience |

The 10 Platform Operations screens above are candidates, not confirmation of the eight functional areas in the scope. Grouping, route consolidation and role-specific access must be reconciled with the approved Platform Operations requirements. The public product, sign-up/sign-in and institutional enquiry experience has no dedicated reference in these 68 files and requires an explicitly approved design before implementation.

## Inventory audit

- Desktop: 34 files (10 admin, 6 contributor, 8 institution, 10 learner).
- Mobile: 34 files (10 admin, 6 contributor, 8 institution, 10 learner).
- Paired logical screen count: 34.
- Filename mismatches: mobile admin examination governance omits `-management`; mobile learner dashboard is `dasboard.png` (typo). Preserve these supplied filenames unless assets are deliberately renamed.
- No separate native app screens identified; mobile files are responsive website references.

## Review gates

Product owner must approve route names, feature mapping, R1/later grouping, public missing screens and reconciliation of 10 admin designs with eight approved operational areas. Accessibility compliance target and formal legal/academic content approval remain open in `open-decisions.md`. Until approved, this inventory is a Phase 0 proposal, not a screen implementation mandate.
