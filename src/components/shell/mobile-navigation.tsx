"use client";

import Link from "next/link";
import { isNavigationItemActive, type NavigationItem } from "./navigation";

type MobileNavigationProps = {
  items: NavigationItem[];
  activePath?: string;
};

export function MobileNavigation({ items, activePath }: MobileNavigationProps) {
  return (
    <details className="mobile-navigation">
      <summary aria-label="Open navigation menu">
        <span aria-hidden="true" className="menu-icon" />
        <span>Menu</span>
      </summary>
      <nav aria-label="Mobile navigation" className="mobile-navigation-panel">
        {items.map((item) => {
          const active = activePath
            ? isNavigationItemActive(activePath, item.href)
            : false;

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className="navigation-link"
              href={item.href}
              key={item.href}
              onClick={(event) => {
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </details>
  );
}
