import { describe, expect, it } from "vitest";
import { isNavigationItemActive } from "@/components/shell/navigation";

describe("isNavigationItemActive", () => {
  it("matches the current route and its nested routes", () => {
    expect(isNavigationItemActive("/learn", "/learn")).toBe(true);
    expect(isNavigationItemActive("/learn/goals", "/learn")).toBe(true);
  });

  it("does not match a similarly prefixed route", () => {
    expect(isNavigationItemActive("/learning", "/learn")).toBe(false);
  });

  it("normalizes trailing slashes and query strings", () => {
    expect(isNavigationItemActive("/learn/goals/?tab=active", "/learn/")).toBe(
      true,
    );
  });

  it("does not treat section anchors as route links", () => {
    expect(isNavigationItemActive("/", "#learners")).toBe(false);
  });
});
