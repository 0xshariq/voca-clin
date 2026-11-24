import Link from "next/link";

export function AppBrand() {
  return (
    <Link className="app-brand" href="/" aria-label="VocaClin home">
      <span className="brand-mark" aria-hidden="true">
        v
      </span>
      <span className="brand-name">VocaClin</span>
    </Link>
  );
}
