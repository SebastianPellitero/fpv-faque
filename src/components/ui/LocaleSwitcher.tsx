'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LocaleSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const next = locale === 'en' ? 'es' : 'en';

    function toggle() {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const cleanPathname = pathname.startsWith(basePath)
            ? pathname.slice(basePath.length)
            : pathname;
        router.replace(cleanPathname || '/', { locale: next });
    }

    return (
        <button
            onClick={toggle}
            aria-label={`Switch to ${next.toUpperCase()}`}
            className='text-sm font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200'
        >
            {locale.toUpperCase()}
        </button>
    );
}
