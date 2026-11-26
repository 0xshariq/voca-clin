import Link from "next/link";

export function AccountMenu() {
  return (
    <div className="account-actions">
      <Link className="button button-secondary header-signin" href="/sign-in">
        Sign in
      </Link>
      <Link
        className="button button-primary header-get-started"
        href="/sign-up"
      >
        Get started
      </Link>
    </div>
  );
}
