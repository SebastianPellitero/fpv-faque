'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
    const t = useTranslations('nav');
    const isScrolled = useNavbarScroll();

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
                isScrolled
                    ? 'h-14 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)]'
                    : 'h-20 bg-transparent'
            }`}
        >
            {/* Brand */}
            <Link
                href='/'
                className='text-[var(--color-foreground)] font-display font-bold text-lg tracking-tight hover:text-[var(--color-accent)] transition-colors duration-200'
            >
                {t('brand')}
            </Link>

            {/* Right cluster */}
            <nav className='flex items-center gap-6'>
                <a
                    href='#work'
                    className='text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200'
                >
                    {t('work')}
                </a>
                <a
                    href='#contact'
                    className='text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200'
                >
                    {t('contact')}
                </a>
                <LocaleSwitcher />
                <ThemeToggle />
            </nav>
        </header>
    );
}
