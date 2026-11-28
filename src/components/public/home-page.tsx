import {
  Activity,
  BookOpen,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  HeartPulse,
  Info,
  Languages,
  LockKeyhole,
  MessageCircleMore,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const challenges = [
  {
    icon: Languages,
    title: "Specialised vocabulary",
    description:
      "Clinical terms and everyday patient wording are both needed to be understood.",
  },
  {
    icon: UsersRound,
    title: "Professional interaction",
    description:
      "Handovers, consent conversations and team updates demand accuracy and tone.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Evidence of progress",
    description:
      "Learners and employers need clear, honest evidence of what has been practised.",
  },
];

const journey = [
  [
    "Learn",
    "Structured lessons in healthcare vocabulary, reading and listening.",
  ],
  [
    "Practise",
    "Realistic communication scenarios for wards, clinics and teams.",
  ],
  ["Assess", "Timed assessments and examinations with clear instructions."],
  ["Feedback", "Specific comments on language, structure and accuracy."],
  ["Improve", "Goals and a learning path built from your own evidence."],
];

const scenarioSteps = [
  { icon: BookOpen, label: "Learn" },
  { icon: MessageCircleMore, label: "Practise" },
  { icon: ClipboardCheck, label: "Assess" },
];

const principles = [
  {
    icon: LockKeyhole,
    title: "Privacy-conscious",
    description: "Learner progress is private unless you share it.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare-focused",
    description: "Content built around real workplace communication.",
  },
  {
    icon: Activity,
    title: "Evidence-based",
    description: "Progress is shown from completed activities, not guesses.",
  },
  {
    icon: HeartPulse,
    title: "Accessible",
    description: "Clear contrast, keyboard support and responsive layouts.",
  },
];

const faqs = [
  {
    question: "Is VocaClin an official CEFR certification?",
    answer:
      "No. Placement and progress indicators are indicative and help guide your learning. VocaClin does not issue official CEFR certification.",
  },
  {
    question: "Do I have to take a placement assessment?",
    answer:
      "No. Placement is optional. You can skip it and start learning right away.",
  },
  {
    question: "Can my employer see my progress?",
    answer: "Your progress is private by default. You choose what to share.",
  },
  {
    question: "Does the AI feedback give medical advice?",
    answer:
      "No. Any optional AI feedback is about language and communication, not medical diagnosis or treatment.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <Badge className="section-label" variant="ghost">
      {children}
    </Badge>
  );
}

function ScenarioPreview() {
  return (
    <Card
      aria-labelledby="scenario-title"
      className="scenario-card"
      role="article"
    >
      <CardHeader className="scenario-card-header">
        <div className="scenario-card-top">
          <Badge className="scenario-label" variant="ghost">
            Practice scenario
          </Badge>
          <Badge className="scenario-duration" variant="outline">
            12 min · B1–B2 range
          </Badge>
        </div>
        <CardTitle className="scenario-card-title">
          <h2 id="scenario-title">Handover to the night shift</h2>
        </CardTitle>
        <CardDescription className="scenario-description">
          <p>
            Practise structured SBAR communication and receive language feedback
            on clarity and register.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="scenario-card-content">
        <blockquote className="scenario-quote">
          <Badge className="scenario-quote-label" variant="ghost">
            Situation
          </Badge>
          <span>
            “Mr Okafor in bed 4 has had increasing shortness of breath since
            18:00. I&apos;ve informed the doctor.”
          </span>
        </blockquote>
        <div className="scenario-steps">
          {scenarioSteps.map(({ icon: Icon, label }) => (
            <Card className="scenario-step" key={label} role="group">
              <CardContent className="scenario-step-content">
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PublicFooter() {
  return (
    <>
      <section aria-labelledby="final-cta-title" className="final-cta">
        <div className="site-container final-cta-inner">
          <h2 id="final-cta-title">
            Ready to strengthen healthcare communication?
          </h2>
          <div className="final-cta-actions">
            <Link
              className={buttonVariants({
                variant: "default",
                className: "button button-light",
              })}
              href="/sign-up"
            >
              Get started
            </Link>
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "button button-outline-light",
              })}
              href="/institutions/enquiry"
            >
              Institution enquiry
            </Link>
          </div>
        </div>
      </section>
      <footer className="public-footer">
        <div className="site-container public-footer-main">
          <div className="footer-brand-block">
            <Link
              className="app-brand app-brand-light"
              href="/"
              aria-label="VocaClin home"
            >
              <span aria-hidden="true" className="brand-mark">
                <MessageCircleMore />
              </span>
              <span className="brand-name">VocaClin</span>
            </Link>
            <p>Healthcare language learning and assessment.</p>
          </div>
          <div className="footer-link-group">
            <h3>Product</h3>
            <a href="#how-it-works">How it works</a>
            <a href="#explore-learning">Explore learning</a>
            <a href="#capabilities">Capabilities</a>
          </div>
          <div className="footer-link-group">
            <h3>Institutions</h3>
            <Link href="/institutions/enquiry">Make an enquiry</Link>
            <span>Institution sign in</span>
          </div>
          <div className="footer-link-group">
            <h3>Contact</h3>
            <a href="mailto:hello@vocaclin.com">hello@vocaclin.com</a>
            <span>Privacy notice</span>
            <span>Terms of use</span>
          </div>
        </div>
        <div className="site-container public-footer-bottom">
          <span>© VocaClin</span>
        </div>
      </footer>
    </>
  );
}

export { PublicFooter };

export function HomePage() {
  return (
    <main id="main-content">
      <section aria-labelledby="hero-title" className="home-hero">
        <div className="site-container home-hero-grid">
          <div className="home-hero-copy">
            <Badge className="eyebrow-pill" variant="secondary">
              <Stethoscope aria-hidden="true" data-icon="inline-start" />
              Healthcare language learning &amp; assessment
            </Badge>
            <h1 id="hero-title">
              Communicate with confidence in every healthcare setting.
            </h1>
            <p className="home-hero-description">
              VocaClin helps healthcare professionals build, practise and
              evidence the language they use with patients, families and
              colleagues, and gives institutions the tools to support their
              teams.
            </p>
            <div className="home-hero-actions">
              <Link
                className={buttonVariants({
                  variant: "default",
                  className: "button button-primary",
                })}
                href="/sign-up"
              >
                Get started as a learner
              </Link>
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "button button-secondary",
                })}
                href="/institutions/enquiry"
              >
                Enquire for your institution
              </Link>
            </div>
            <p className="hero-caption">
              <Info aria-hidden="true" /> Free to create an account. Placement
              is optional.
            </p>
          </div>
          <ScenarioPreview />
        </div>
      </section>

      <section
        aria-labelledby="challenge-title"
        className="challenge-section"
        id="capabilities"
      >
        <div className="site-container">
          <SectionLabel>The challenge</SectionLabel>
          <h2 className="section-heading" id="challenge-title">
            Clear language protects patients and supports teams.
          </h2>
          <p className="section-description">
            Healthcare communication needs more than general fluency.
            Professionals must handle specialised vocabulary, sensitive
            conversations and precise handovers, often under time pressure.
          </p>
          <div className="challenge-grid">
            {challenges.map(({ icon: Icon, title, description }) => (
              <Card
                aria-labelledby={`challenge-${title}`}
                className="feature-card"
                key={title}
                role="article"
              >
                <CardHeader>
                  <span className="feature-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <CardTitle>
                    <h3 id={`challenge-${title}`}>{title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p>{description}</p>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="journey-title"
        className="journey-section"
        id="how-it-works"
      >
        <div className="site-container">
          <SectionLabel>How VocaClin works</SectionLabel>
          <h2 className="section-heading" id="journey-title">
            One connected journey, from first lesson to next step.
          </h2>
          <ol className="journey-grid">
            {journey.map(([title, description], index) => (
              <li key={title}>
                <Card
                  aria-labelledby={`journey-${title}`}
                  className={
                    index === journey.length - 1
                      ? "journey-card journey-card-highlight"
                      : "journey-card"
                  }
                  role="article"
                >
                  <CardHeader>
                    <Badge className="journey-number" variant="default">
                      {index + 1}
                    </Badge>
                    <CardTitle>
                      <h3 id={`journey-${title}`}>{title}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <p>{description}</p>
                    </CardDescription>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-label="Learning and assessment capabilities"
        className="capabilities-section"
      >
        <div className="site-container capabilities-grid">
          <Card className="capability-card" role="article">
            <CardHeader>
              <BookOpen aria-hidden="true" className="feature-icon" />
              <CardTitle>
                <h2>Learning and practice</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li>
                  <Check aria-hidden="true" />
                  Courses with vocabulary, reading, listening and writing
                  activities
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Healthcare communication scenarios focused on language, not
                  clinical decisions
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Save and resume any activity
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Optional AI language feedback you can switch off
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="capability-card" role="article">
            <CardHeader>
              <ClipboardCheck aria-hidden="true" className="feature-icon" />
              <CardTitle>
                <h2>Assessment and progress</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li>
                  <Check aria-hidden="true" />
                  Skill-wise progress for reading, listening, writing and
                  speaking
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Results with feedback and recommended next steps
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Optional placement to guide where you start
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Private by default; you choose what to share
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <p className="site-container placement-disclaimer">
          <Info aria-hidden="true" /> Placement and progress indicators are
          indicative and guide learning. They are not official CEFR
          certification.
        </p>
      </section>

      <section
        aria-label="Learning for individuals and institutions"
        className="audience-section"
      >
        <div className="site-container audience-grid">
          <Card className="audience-card" role="article">
            <CardHeader>
              <Badge className="audience-tag" variant="secondary">
                For individuals
              </Badge>
              <CardTitle>
                <h2>Learn at your own pace, with a clear next step.</h2>
              </CardTitle>
              <CardDescription>
                <p>
                  Set goals, follow a course, practise real scenarios and see
                  exactly how you are progressing.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooterLink className="button button-primary" href="/sign-up">
              Create a free account
            </CardFooterLink>
          </Card>
          <Card
            className="audience-card audience-card-dark"
            id="institutions"
            role="article"
          >
            <CardHeader>
              <Badge
                className="audience-tag audience-tag-amber"
                variant="secondary"
              >
                For institutions
              </Badge>
              <CardTitle>
                <h2>
                  Support your teams with assigned learning and private
                  examinations.
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li>
                  <Check aria-hidden="true" />
                  Invite members and organise cohorts
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Assign platform-owned programmes
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Run private examinations and view aggregated reports
                </li>
              </ul>
            </CardContent>
            <CardFooterLink
              className="button button-amber"
              href="/institutions/enquiry"
            >
              Enquire for your institution
            </CardFooterLink>
          </Card>
        </div>
      </section>

      <section aria-labelledby="why-title" className="why-section">
        <div className="site-container">
          <h2 className="section-heading" id="why-title">
            Why VocaClin
          </h2>
          <div className="principles-grid">
            {principles.map(({ icon: Icon, title, description }) => (
              <Card className="principle-card" key={title} role="article">
                <CardHeader>
                  <Icon aria-hidden="true" />
                  <CardTitle>
                    <h3>{title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p>{description}</p>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="faq-section" id="faq">
        <div className="faq-container">
          <h2 id="faq-title">Frequently asked questions</h2>
          <Accordion className="faq-list" defaultValue={[faqs[0].question]}>
            {faqs.map(({ question, answer }) => (
              <AccordionItem
                className="faq-item"
                key={question}
                value={question}
              >
                <AccordionTrigger className="faq-trigger">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="faq-answer">
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}

function CardFooterLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href: string;
}) {
  return (
    <CardFooter className="audience-card-action">
      <Link
        className={buttonVariants({ variant: "default", className })}
        href={href}
      >
        {children}
      </Link>
    </CardFooter>
  );
}
