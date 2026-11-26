import { HomePage } from "@/components/public/home-page";
import { publicNavigation } from "@/components/public/navigation";
import { ExperienceShell } from "@/components/shell/experience-shell";

export default function Home() {
  return (
    <ExperienceShell navigation={publicNavigation} footer={false}>
      <HomePage />
    </ExperienceShell>
  );
}
