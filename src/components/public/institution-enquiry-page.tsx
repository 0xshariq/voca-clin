import {
  Info,
  Landmark,
  ListChecks,
  LockKeyhole,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { ExperienceShell } from "@/components/shell/experience-shell";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { publicNavigation } from "./navigation";

const serviceAreas = [
  {
    icon: UsersRound,
    title: "Members and cohorts",
    detail: "Invite learners and organise them into cohorts.",
  },
  {
    icon: ListChecks,
    title: "Assigned learning",
    detail: "Assign platform-owned programmes and track completion.",
  },
  {
    icon: LockKeyhole,
    title: "Private examinations",
    detail: "Run examinations that stay within your organisation.",
  },
];

function EnquiryFooter() {
  return (
    <footer className="enquiry-footer">
      <div className="site-container enquiry-footer-inner">
        <span>© VocaClin</span>
        <nav aria-label="Legal and contact links">
          <span>Privacy notice</span>
          <span>Terms of use</span>
          <a href="mailto:hello@vocaclin.com">hello@vocaclin.com</a>
        </nav>
      </div>
    </footer>
  );
}

function EnquiryField({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  className,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <Field className={["enquiry-field", className].filter(Boolean).join(" ")}>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </FieldLabel>
      <Input
        disabled
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </Field>
  );
}

function EnquirySelect({
  id,
  label,
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <Field className="enquiry-field">
      <FieldLabel htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </FieldLabel>
      <Select disabled>
        <SelectTrigger
          aria-label={label}
          className="enquiry-select-trigger"
          disabled
          id={id}
          name={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
    </Field>
  );
}

export function InstitutionEnquiryPage() {
  return (
    <ExperienceShell
      navigation={publicNavigation}
      activePath="/institutions/enquiry"
      footer={<EnquiryFooter />}
    >
      <main className="enquiry-page" id="main-content">
        <div className="site-container enquiry-layout">
          <section aria-labelledby="enquiry-title" className="enquiry-story">
            <Breadcrumb aria-label="Breadcrumb" className="breadcrumb">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" />}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>For institutions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Badge className="eyebrow-pill enquiry-tag" variant="secondary">
              <Landmark aria-hidden="true" data-icon="inline-start" />
              Institutional enquiry
            </Badge>
            <h1 id="enquiry-title">
              Talk to us about supporting your healthcare teams.
            </h1>
            <p className="enquiry-intro">
              Tell us a little about your organisation. Our team will reply
              within two working days to discuss how VocaClin could fit your
              needs.
            </p>
            <ul className="enquiry-services">
              {serviceAreas.map(({ icon: Icon, title, detail }) => (
                <li key={title}>
                  <Badge className="enquiry-service-icon" variant="secondary">
                    <Icon aria-hidden="true" />
                  </Badge>
                  <span>
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </span>
                </li>
              ))}
            </ul>
            <Card className="enquiry-privacy-note" role="note">
              <CardContent>
                <UsersRound aria-hidden="true" />
                <span>
                  We only ask for what we need to respond. Please do not include
                  learner or patient information in your message.
                </span>
              </CardContent>
            </Card>
          </section>

          <Card
            aria-labelledby="enquiry-form-title"
            className="enquiry-card"
            role="group"
          >
            <CardHeader className="enquiry-card-header">
              <CardTitle>
                <h2 id="enquiry-form-title">Your enquiry</h2>
              </CardTitle>
              <CardDescription className="required-note">
                <p>Fields marked * are required.</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="enquiry-card-content">
              <FieldGroup className="enquiry-form-grid">
                <EnquiryField
                  className="enquiry-field-full"
                  id="organisation"
                  label="Organisation name"
                  placeholder="e.g. St Mary’s University Hospital"
                  required
                />
                <EnquirySelect
                  id="organisation-type"
                  label="Organisation type"
                  placeholder="Select type"
                  required
                />
                <EnquirySelect
                  id="country"
                  label="Country"
                  placeholder="Select country"
                  required
                />
                <EnquiryField
                  id="contact-person"
                  label="Contact person"
                  placeholder="Full name"
                  required
                />
                <EnquiryField
                  id="job-title"
                  label="Job title (optional)"
                  placeholder="e.g. Head of Nursing Education"
                />
                <EnquiryField
                  id="work-email"
                  label="Work email"
                  placeholder="name@organisation.org"
                  required
                  type="email"
                />
                <EnquirySelect
                  id="learner-count"
                  label="Approximate number of learners"
                  placeholder="Select range"
                  required
                />
                <Field className="enquiry-field enquiry-field-full">
                  <FieldLabel htmlFor="help-message">
                    How can we help? *
                  </FieldLabel>
                  <Textarea
                    disabled
                    id="help-message"
                    maxLength={1000}
                    name="message"
                    placeholder="Tell us about your team and what you would like to achieve."
                    required
                    rows={4}
                  />
                  <FieldDescription className="character-count">
                    0 / 1000
                  </FieldDescription>
                </Field>
              </FieldGroup>
              <Field className="enquiry-consent" orientation="horizontal">
                <Checkbox disabled id="enquiry-consent" name="consent" />
                <FieldContent>
                  <FieldLabel htmlFor="enquiry-consent">
                    I agree that VocaClin may use these details to respond to my
                    enquiry, as described in the{" "}
                    <span className="terms-link">Privacy notice</span>.
                  </FieldLabel>
                </FieldContent>
              </Field>
              <p className="enquiry-preview-note sr-only" role="note">
                <Info aria-hidden="true" /> This preview does not collect or
                send enquiry details.
              </p>
              <div className="enquiry-actions">
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    className: "button button-secondary",
                  })}
                  href="/"
                >
                  Cancel
                </Link>
                <Button
                  className="button button-primary"
                  disabled
                  type="button"
                >
                  Send enquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </ExperienceShell>
  );
}
