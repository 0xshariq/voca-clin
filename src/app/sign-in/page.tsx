import type { Metadata } from "next";
import { AccessPage } from "@/components/public/access-page";

export const metadata: Metadata = {
  title: "Sign in | VocaClin",
  description: "A preview of the VocaClin sign-in experience.",
};

export default function SignInPage() {
  return <AccessPage mode="sign-in" />;
}
