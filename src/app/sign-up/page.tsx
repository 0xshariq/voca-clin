import type { Metadata } from "next";
import { AccessPage } from "@/components/public/access-page";

export const metadata: Metadata = {
  title: "Create an account | VocaClin",
  description: "A preview of the VocaClin account creation experience.",
};

export default function SignUpPage() {
  return <AccessPage mode="sign-up" />;
}
