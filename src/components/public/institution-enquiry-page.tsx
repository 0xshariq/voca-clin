import {
  Info,
  Landmark,
  ListChecks,
  LockKeyhole,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { ExperienceShell } from "@/components/shell/experience-shell";
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
        <span>© VocaClin · RicOz Innovation</span>
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
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="enquiry-field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <input disabled id={id} name={id} placeholder={placeholder} type={type} />
    </div>
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
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">For institutions</span>
            </nav>
            <p className="eyebrow-pill enquiry-tag">
              <Landmark aria-hidden="true" />
              Institutional enquiry
            </p>
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
                  <span className="enquiry-service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </span>
                </li>
              ))}
            </ul>
            <p className="enquiry-privacy-note">
              <UsersRound aria-hidden="true" />
              We only ask for what we need to respond. Please do not include
              learner or patient information in your message.
            </p>
          </section>

          <section
            aria-labelledby="enquiry-form-title"
            className="enquiry-card"
          >
            <h2 id="enquiry-form-title">Your enquiry</h2>
            <p className="required-note">Fields marked * are required.</p>
            <div className="enquiry-form-grid">
              <div className="enquiry-field enquiry-field-full">
                <label htmlFor="organisation">Organisation name *</label>
                <input
                  disabled
                  id="organisation"
                  name="organisation"
                  placeholder="e.g. St Mary’s University Hospital"
                  required
                />
              </div>
              <div className="enquiry-field">
                <label htmlFor="organisation-type">Organisation type *</label>
                <select
                  disabled
                  id="organisation-type"
                  name="organisation-type"
                  required
                  defaultValue=""
                >
                  <option value="">Select type</option>
                </select>
              </div>
              <div className="enquiry-field">
                <label htmlFor="country">Country *</label>
                <select
                  disabled
                  id="country"
                  name="country"
                  required
                  defaultValue=""
                >
                  <option value="">Select country</option>
                </select>
              </div>
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
                type="email"
                required
              />
              <div className="enquiry-field">
                <label htmlFor="learner-count">
                  Approximate number of learners *
                </label>
                <select
                  disabled
                  id="learner-count"
                  name="learner-count"
                  required
                  defaultValue=""
                >
                  <option value="">Select range</option>
                </select>
              </div>
              <div className="enquiry-field enquiry-field-full">
                <label htmlFor="help-message">How can we help? *</label>
                <textarea
                  disabled
                  id="help-message"
                  maxLength={1000}
                  name="message"
                  placeholder="Tell us about your team and what you would like to achieve."
                  required
                  rows={4}
                />
                <span className="character-count">0 / 1000</span>
              </div>
            </div>
            <label className="enquiry-consent">
              <input disabled name="consent" required type="checkbox" />
              <span>
                I agree that VocaClin may use these details to respond to my
                enquiry, as described in the{" "}
                <span className="terms-link">Privacy notice</span>.
              </span>
            </label>
            <p className="enquiry-preview-note sr-only" role="note">
              <Info aria-hidden="true" /> This preview does not collect or send
              enquiry details.
            </p>
            <div className="enquiry-actions">
              <Link className="button button-secondary" href="/">
                Cancel
              </Link>
              <button className="button button-primary" disabled type="button">
                Send enquiry
              </button>
            </div>
          </section>
        </div>
      </main>
    </ExperienceShell>
  );
}
