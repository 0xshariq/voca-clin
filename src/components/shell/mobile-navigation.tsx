"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isNavigationItemActive, type NavigationItem } from "./navigation";

type MobileNavigationProps = {
  items: NavigationItem[];
  activePath?: string;
};

export function MobileNavigation({ items, activePath }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div
      className="mobile-navigation"
      data-hydrated={isHydrated ? "true" : "false"}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              aria-label="Open navigation menu"
              className="mobile-navigation-trigger"
              variant="outline"
            />
          }
        >
          <Menu aria-hidden="true" data-icon="inline-start" />
          <span>Menu</span>
        </SheetTrigger>
        <SheetContent className="mobile-navigation-panel" side="right">
          <SheetHeader className="mobile-navigation-header">
            <SheetTitle>Explore VocaClin</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate to public VocaClin pages.
            </SheetDescription>
          </SheetHeader>
          <nav
            aria-label="Mobile navigation"
            className="mobile-navigation-links"
          >
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
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
