"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
    <NavigationMenu
      className="primary-navigation"
      aria-label="Primary navigation"
    >
      <NavigationMenuList>
        {items.map((item) => {
          const active = activePath
            ? isNavigationItemActive(activePath, item.href)
            : false;

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                aria-current={active ? "page" : undefined}
                className="navigation-link"
                render={<Link href={item.href} />}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
