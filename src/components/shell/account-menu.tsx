import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function AccountMenu() {
  return (
    <div className="account-actions">
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "button button-secondary header-signin",
        })}
        href="/sign-in"
      >
        Sign in
      </Link>
      <Link
        className={buttonVariants({
          variant: "default",
          className: "button button-primary header-get-started",
        })}
        href="/sign-up"
      >
        Get started
      </Link>
    </div>
  );
}
