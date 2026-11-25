import type { ReactNode } from "react";
import { AccountMenu } from "./account-menu";
import { AppBrand } from "./app-brand";
import { MobileNavigation } from "./mobile-navigation";
import type { NavigationItem } from "./navigation";
import { PrimaryNavigation } from "./primary-navigation";

type ExperienceShellProps = {
  children: ReactNode;
  navigation: NavigationItem[];
  activePath?: string;
};

export function ExperienceShell({
  children,
  navigation,
  activePath,
}: ExperienceShellProps) {
  return (
    <div className="experience-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <AppBrand />
          <PrimaryNavigation items={navigation} activePath={activePath} />
          <div className="header-tools">
            <AccountMenu />
            <MobileNavigation items={navigation} activePath={activePath} />
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <AppBrand />
          <p>Product foundation in progress. More details will follow.</p>
        </div>
      </footer>
    </div>
  );
}
