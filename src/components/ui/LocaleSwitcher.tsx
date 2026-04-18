"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggle() {
    const next = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: next });
  }

  const next = locale === "en" ? "es" : "en";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${next.toUpperCase()}`}
      className="text-sm font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
    >
      {locale.toUpperCase()}
    </button>
  );
}
