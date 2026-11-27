import { Check, Eye, Landmark, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { AppBrand } from "@/components/shell/app-brand";

type AccessMode = "sign-in" | "sign-up";

type AccessPageProps = {
  mode: AccessMode;
};

function PreviewNotice() {
  return (
    <p className="access-preview-note sr-only" role="note">
      This design preview does not authenticate accounts or send information.
    </p>
  );
}

function SocialOptions({ mode }: { mode: AccessMode }) {
  const action = mode === "sign-in" ? "Continue" : "Sign up";

  return (
    <fieldset className="social-options">
      <legend className="sr-only">{action} options</legend>
      <button className="social-button" disabled type="button">
        <span aria-hidden="true" className="google-g">
          G
        </span>
        {action} with Google
      </button>
      <button className="social-button" disabled type="button">
        <span aria-hidden="true" className="microsoft-mark">
          <i />
          <i />
          <i />
          <i />
        </span>
        {action} with Microsoft
      </button>
    </fieldset>
  );
}

function FormField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="access-field">
      <label htmlFor={id}>{label}</label>
      <div className="access-input-wrap">
        <input
          autoComplete={autoComplete}
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
        />
        {type === "password" ? (
          <Eye aria-hidden="true" className="password-eye" />
        ) : null}
      </div>
    </div>
  );
}

function SignInForm() {
  return (
    <section aria-labelledby="access-card-title" className="access-form-panel">
      <h2 id="access-card-title">Welcome back</h2>
      <p className="access-form-intro">Sign in to your VocaClin account.</p>
      <fieldset className="account-type-options">
        <legend className="sr-only">Account type</legend>
        <div className="account-type-card account-type-card-selected">
          <UserRound aria-hidden="true" />
          <strong>Individual learner</strong>
          <span>Continue your personal learning journey with VocaClin.</span>
        </div>
        <div className="account-type-card">
          <Landmark aria-hidden="true" />
          <strong>Institution access</strong>
          <span>
            Access your organization&apos;s VocaClin learning and workspace.
          </span>
        </div>
      </fieldset>
      <p className="account-type-note">
        <ShieldCheck aria-hidden="true" /> One person, one VocaClin identity.
        Your experiences depend on your memberships and roles.
      </p>
      <SocialOptions mode="sign-in" />
      <div className="form-divider">
        <span>or sign in with email</span>
      </div>
      <div className="access-fields">
        <FormField
          id="email"
          label="Email address"
          placeholder="name@example.com"
          type="email"
          autoComplete="email"
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <span aria-disabled="true" className="forgot-password-link">
          Forgot password?
        </span>
      </div>
      <button
        className="button button-primary access-submit"
        disabled
        type="button"
      >
        Sign in
      </button>
      <p className="access-switch">
        <span>New to VocaClin?</span>
        <Link href="/sign-up">Create an account</Link>
      </p>
      <PreviewNotice />
      <div className="staff-access-note">
        <p>VocaClin team member?</p>
        <span className="staff-access-link">Staff sign-in</span>
        <span>(separate access with required MFA)</span>
      </div>
    </section>
  );
}

function SignUpForm() {
  return (
    <section
      aria-labelledby="access-card-title"
      className="access-form-panel signup-form-panel"
    >
      <h2 id="access-card-title">Create your account</h2>
      <p className="access-form-intro">
        One VocaClin identity for everything you do. A name and email are all
        you need.
      </p>
      <aside className="identity-notice">
        <ShieldCheck aria-hidden="true" />
        <span>
          <strong>One person, one account.</strong> If your organization invites
          you later, your existing account is linked to it. You won&apos;t need
          a second account, and there&apos;s nothing to choose now.
        </span>
      </aside>
      <SocialOptions mode="sign-up" />
      <div className="form-divider">
        <span>or use your email</span>
      </div>
      <div className="access-fields">
        <div className="name-fields">
          <FormField
            id="first-name"
            label="First name"
            autoComplete="given-name"
          />
          <FormField
            id="last-name"
            label="Last name"
            autoComplete="family-name"
          />
        </div>
        <FormField
          id="signup-email"
          label="Email address"
          placeholder="name@example.com"
          type="email"
          autoComplete="email"
        />
        <FormField
          id="signup-password"
          label="Password"
          type="password"
          autoComplete="new-password"
        />
        <p className="field-hint">At least 8 characters.</p>
        <label className="terms-agreement">
          <input type="checkbox" />
          <span>
            I agree to the <span className="terms-link">Terms of use</span> and
            have read the <span className="terms-link">Privacy notice</span>.
          </span>
        </label>
      </div>
      <button
        className="button button-primary access-submit"
        disabled
        type="button"
      >
        Create account
      </button>
      <p className="access-switch">
        <span>Already have an account?</span>
        <Link href="/sign-in">Sign in</Link>
      </p>
      <PreviewNotice />
    </section>
  );
}

export function AccessPage({ mode }: AccessPageProps) {
  const isSignIn = mode === "sign-in";

  return (
    <main className={`access-screen access-screen--${mode}`} id="main-content">
      <aside className="access-story-panel">
        <div className="access-brand">
          <AppBrand />
        </div>
        <div className="access-story-copy">
          {isSignIn ? (
            <>
              <h1 style={{ maxWidth: 650 }}>
                Learn. Practise. Assess. Improve.
              </h1>
              <p>
                Pick up where you left off with healthcare communication
                practice, assessments and feedback.
              </p>
              <div className="continue-learning-card">
                <span>Continue learning</span>
                <strong>Handover to the night shift</strong>
                <span className="learning-progress">
                  <i />
                </span>
              </div>
            </>
          ) : (
            <>
              <h1 style={{ maxWidth: 500 }}>
                Start building healthcare communication skills.
              </h1>
              <ul className="signup-benefits">
                <li>
                  <Check aria-hidden="true" />
                  Free to create an account
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Optional placement, never required
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Your progress stays private by default
                </li>
              </ul>
            </>
          )}
        </div>
        <p className="access-copyright">© VocaClin · RicOz Innovation</p>
      </aside>
      <div className="access-form-side">
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
      <div aria-hidden="true" className="design-credit">
        VocaClin
      </div>
    </main>
  );
}
