import {
  ArrowRight,
  ArrowUpRight,
  HeartPulse,
  Layers3,
  MessageCircleMore,
} from "lucide-react";
import { ExperienceShell } from "@/components/shell/experience-shell";
import type { NavigationItem } from "@/components/shell/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";

const navigation: NavigationItem[] = [
  { href: "#learners", label: "For learners" },
  { href: "#institutions", label: "For institutions" },
  { href: "#approach", label: "Our approach" },
];

const learningPillars = [
  {
    icon: Layers3,
    title: "Learn with structure",
    description:
      "Build practical English skills through a clear learning journey shaped around healthcare communication.",
  },
  {
    icon: MessageCircleMore,
    title: "Practice with purpose",
    description:
      "Work toward more confident conversations with focused practice and useful feedback.",
  },
  {
    icon: HeartPulse,
    title: "Grow over time",
    description:
      "See learning progress as a story of steady development, not a single score.",
  },
];

export default function Home() {
  return (
    <ExperienceShell navigation={navigation}>
      <main id="main-content">
        <section aria-labelledby="hero-title" className="hero-section">
          <div className="hero-grid page-container">
            <div className="hero-copy">
              <p className="eyebrow">
                <span aria-hidden="true" className="eyebrow-mark" />
                Healthcare English, practiced with purpose
              </p>
              <h1 id="hero-title">
                Find the words for <span>better care.</span>
              </h1>
              <p className="hero-description">
                VocaClin is building a thoughtful learning space for people who
                want to grow their English for healthcare communication.
              </p>
              <div className="hero-actions">
                <a
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "hero-primary-action",
                  )}
                  href="#learners"
                >
                  Explore the learning approach
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </a>
                <a className="text-action" href="#institutions">
                  For institutions
                  <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                </a>
              </div>
              <p className="hero-note">
                A product foundation in progress. Experience details will be
                shared as they are defined.
              </p>
            </div>

            <section
              aria-labelledby="conversation-label"
              className="conversation-card"
            >
              <div className="conversation-card-topline">
                <span className="conversation-icon" aria-hidden="true">
                  <MessageCircleMore />
                </span>
                <div>
                  <p className="conversation-label" id="conversation-label">
                    A moment in conversation
                  </p>
                  <p className="conversation-meta">
                    Listen · Understand · Respond
                  </p>
                </div>
                <span aria-hidden="true" className="conversation-status">
                  <span aria-hidden="true" />
                </span>
              </div>
              <div className="conversation-body">
                <p className="conversation-prompt">A patient says:</p>
                <blockquote>
                  “I have been feeling a little more tired than usual.”
                </blockquote>
                <div className="response-hint">
                  <span className="response-avatar" aria-hidden="true">
                    VC
                  </span>
                  <p>
                    What would you ask next to understand how they are feeling?
                  </p>
                </div>
              </div>
              <div className="conversation-card-bottom">
                <span>Practice moment</span>
                <span>Healthcare English</span>
              </div>
            </section>
          </div>
          <div aria-hidden="true" className="hero-bottom-rule" />
        </section>

        <section
          aria-labelledby="learners-title"
          className="learning-section page-container"
          id="learners"
        >
          <div className="section-intro">
            <p className="eyebrow">For learners</p>
            <h2 id="learners-title">
              Language learning that keeps the human moment in view.
            </h2>
            <p>
              The VocaClin learning experience is being shaped around useful
              practice, clear next steps, and progress learners can understand.
            </p>
          </div>
          <div className="pillar-grid">
            {learningPillars.map(
              ({ icon: Icon, title, description }, index) => (
                <article className="pillar-card" key={title}>
                  <span className="pillar-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="pillar-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ),
            )}
          </div>
        </section>

        <section
          aria-labelledby="institutions-title"
          className="institution-section"
          id="institutions"
        >
          <div className="institution-inner page-container">
            <div className="institution-mark" aria-hidden="true">
              <Layers3 />
            </div>
            <div className="institution-copy">
              <p className="eyebrow">For institutions</p>
              <h2 id="institutions-title">
                Support learning across a team, with care and clarity.
              </h2>
              <p>
                Institution tools are planned for organizing learners, assigning
                platform learning, and reviewing authorized progress together.
              </p>
            </div>
            <a className="text-action institution-link" href="#approach">
              See the principles
              <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
            </a>
          </div>
        </section>

        <section
          aria-labelledby="approach-title"
          className="approach-section page-container"
          id="approach"
        >
          <div className="approach-label">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title">Built around what matters.</h2>
          </div>
          <ul className="principle-list">
            <li>
              <span>01</span>
              <p>
                Learning first. Useful activity before decorative statistics.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                Privacy by default. Personal progress belongs to the learner.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                Accessible by design. Clear contrast, focus, and navigation.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </ExperienceShell>
  );
}
