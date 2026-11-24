import Link from "next/link";
import { isNavigationItemActive, type NavigationItem } from "./navigation";

type PrimaryNavigationProps = {
  items: NavigationItem[];
  activePath?: string;
};

export function PrimaryNavigation({
  items,
  activePath,
}: PrimaryNavigationProps) {
  return (
    <nav aria-label="Primary navigation" className="primary-navigation">
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
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
