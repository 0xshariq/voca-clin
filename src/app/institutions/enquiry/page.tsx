import type { Metadata } from "next";
import { InstitutionEnquiryPage } from "@/components/public/institution-enquiry-page";

export const metadata: Metadata = {
  title: "For institutions | VocaClin",
  description:
    "Explore VocaClin's approach to healthcare English learning for institutions.",
};

export default function EnquiryPage() {
  return <InstitutionEnquiryPage />;
}
