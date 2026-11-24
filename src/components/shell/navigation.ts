export type NavigationItem = {
  href: string;
  label: string;
};

function normalizePath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, "");
  return pathname || "/";
}

export function isNavigationItemActive(pathname: string, href: string) {
  if (!pathname.startsWith("/") || !href.startsWith("/")) {
    return false;
  }

  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(href);

  return (
    currentPath === targetPath ||
    (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`))
  );
}
