import { Check, Eye, Landmark, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { AppBrand } from "@/components/shell/app-brand";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";

type AccessMode = "sign-in" | "sign-up";

type AccessPageProps = {
  mode: AccessMode;
};

type FormFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  description?: string;
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
    <FieldSet className="social-options">
      <FieldLegend className="sr-only">{action} options</FieldLegend>
      <Button className="social-button" disabled variant="outline">
        <span aria-hidden="true" className="google-g">
          G
        </span>
        {action} with Google
      </Button>
      <Button className="social-button" disabled variant="outline">
        <span aria-hidden="true" className="microsoft-mark">
          <i />
          <i />
          <i />
          <i />
        </span>
        {action} with Microsoft
      </Button>
    </FieldSet>
  );
}

function FormField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  description,
}: FormFieldProps) {
  return (
    <Field className="access-field">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {type === "password" ? (
        <InputGroup className="access-input-wrap">
          <InputGroupInput
            autoComplete={autoComplete}
            id={id}
            name={id}
            placeholder={placeholder}
            type={type}
          />
          <InputGroupAddon align="inline-end">
            <Eye aria-hidden="true" className="password-eye" />
          </InputGroupAddon>
        </InputGroup>
      ) : (
        <div className="access-input-wrap">
          <Input
            autoComplete={autoComplete}
            id={id}
            name={id}
            placeholder={placeholder}
            type={type}
          />
        </div>
      )}
      {description ? (
        <FieldDescription className="field-hint">
          {description}
        </FieldDescription>
      ) : null}
    </Field>
  );
}

function AccountTypeCard({
  icon: Icon,
  title,
  description,
  selected = false,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  selected?: boolean;
}) {
  return (
    <Card
      aria-label={title}
      className={
        selected
          ? "account-type-card account-type-card-selected"
          : "account-type-card"
      }
      role="group"
    >
      <CardContent className="account-type-content">
        <Icon aria-hidden="true" />
        <CardTitle>
          <strong>{title}</strong>
        </CardTitle>
        <CardDescription>
          <span>{description}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

function SignInForm() {
  return (
    <section aria-labelledby="access-card-title" className="access-form-panel">
      <Card className="access-form-card">
        <CardHeader className="access-form-header">
          <CardTitle>
            <h2 id="access-card-title">Welcome back</h2>
          </CardTitle>
          <CardDescription className="access-form-intro">
            <p>Sign in to your VocaClin account.</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="access-form-content">
          <FieldSet className="account-type-options">
            <FieldLegend className="sr-only">Account types</FieldLegend>
            <AccountTypeCard
              description="Continue your personal learning journey with VocaClin."
              icon={UserRound}
              selected
              title="Individual learner"
            />
            <AccountTypeCard
              description="Access your organization's VocaClin learning and workspace."
              icon={Landmark}
              title="Institution access"
            />
          </FieldSet>
          <p className="account-type-note">
            <ShieldCheck aria-hidden="true" /> One person, one VocaClin
            identity. Your experiences depend on your memberships and roles.
          </p>
          <SocialOptions mode="sign-in" />
          <FieldSeparator className="form-divider">
            or sign in with email
          </FieldSeparator>
          <FieldGroup className="access-fields">
            <FormField
              autoComplete="email"
              id="email"
              label="Email address"
              placeholder="name@example.com"
              type="email"
            />
            <FormField
              autoComplete="current-password"
              id="password"
              label="Password"
              type="password"
            />
            <Button
              className="forgot-password-link"
              disabled
              type="button"
              variant="link"
            >
              Forgot password?
            </Button>
          </FieldGroup>
          <Button className="access-submit" disabled>
            Sign in
          </Button>
        </CardContent>
        <CardFooter className="access-switch">
          <span>New to VocaClin?</span>
          <Link href="/sign-up">Create an account</Link>
        </CardFooter>
        <div className="staff-access-note">
          <p>VocaClin team member?</p>
          <span className="staff-access-link">Staff sign-in</span>
          <span>(separate access with required MFA)</span>
        </div>
      </Card>
      <PreviewNotice />
    </section>
  );
}

function SignUpForm() {
  return (
    <section
      aria-labelledby="access-card-title"
      className="access-form-panel signup-form-panel"
    >
      <Card className="access-form-card">
        <CardHeader className="access-form-header">
          <CardTitle>
            <h2 id="access-card-title">Create your account</h2>
          </CardTitle>
          <CardDescription className="access-form-intro">
            <p>
              One VocaClin identity for everything you do. A name and email are
              all you need.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="access-form-content">
          <Card className="identity-notice" role="note">
            <CardContent>
              <ShieldCheck aria-hidden="true" />
              <span>
                <strong>One person, one account.</strong> If your organization
                invites you later, your existing account is linked to it. You
                won&apos;t need a second account, and there&apos;s nothing to
                choose now.
              </span>
            </CardContent>
          </Card>
          <SocialOptions mode="sign-up" />
          <FieldSeparator className="form-divider">
            or use your email
          </FieldSeparator>
          <FieldGroup className="access-fields">
            <FieldGroup className="name-fields">
              <FormField
                autoComplete="given-name"
                id="first-name"
                label="First name"
              />
              <FormField
                autoComplete="family-name"
                id="last-name"
                label="Last name"
              />
            </FieldGroup>
            <FormField
              autoComplete="email"
              id="signup-email"
              label="Email address"
              placeholder="name@example.com"
              type="email"
            />
            <FormField
              autoComplete="new-password"
              description="At least 8 characters."
              id="signup-password"
              label="Password"
              type="password"
            />
            <Field className="terms-agreement" orientation="horizontal">
              <Checkbox disabled id="terms" />
              <FieldContent>
                <FieldLabel htmlFor="terms">
                  I agree to the{" "}
                  <span className="terms-link">Terms of use</span>
                  and have read the{" "}
                  <span className="terms-link">Privacy notice</span>.
                </FieldLabel>
              </FieldContent>
            </Field>
          </FieldGroup>
          <Button className="access-submit" disabled>
            Create account
          </Button>
        </CardContent>
        <CardFooter className="access-switch">
          <span>Already have an account?</span>
          <Link href="/sign-in">Sign in</Link>
        </CardFooter>
      </Card>
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
              <h1 className="access-story-heading-signin">
                Learn. Practise. Assess. Improve.
              </h1>
              <p>
                Pick up where you left off with healthcare communication
                practice, assessments and feedback.
              </p>
              <Card className="continue-learning-card" role="article">
                <CardHeader>
                  <CardDescription>Continue learning</CardDescription>
                  <CardTitle>
                    <strong>Handover to the night shift</strong>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress
                    aria-label="Learning progress"
                    className="learning-progress"
                    value={60}
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <h1 className="access-story-heading-signup">
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
        <p className="access-copyright">© VocaClin</p>
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
