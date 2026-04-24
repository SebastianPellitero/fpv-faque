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
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 transition-all duration-500 ${
                isScrolled
                    ? 'h-14 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)]'
                    : 'h-20 bg-transparent'
            }`}
        >
            {/* Brand — abbreviated on mobile */}
            <Link
                href='/'
                className='text-[var(--color-foreground)] font-display font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors duration-200 min-w-0 mr-4'
            >
                <span className='hidden md:inline text-lg'>{t('brand')}</span>
                <span className='md:hidden text-base'>faque<span className='text-[var(--color-accent)]'>fpv</span></span>
            </Link>

            {/* Right cluster */}
            <nav className='flex items-center gap-4 md:gap-6 shrink-0'>
                {/* Nav links — hidden on mobile */}
                <a
                    href='#services'
                    className='hidden md:block text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200'
                >
                    {t('services')}
                </a>
                <a
                    href='#work'
                    className='hidden md:block text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200'
                >
                    {t('work')}
                </a>
                <a
                    href='#fleet'
                    className='hidden md:block text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200'
                >
                    {t('fleet')}
                </a>
                <a
                    href='#contact'
                    className='hidden md:block text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200'
                >
                    {t('contact')}
                </a>
                <LocaleSwitcher />
                <ThemeToggle />
            </nav>
        </header>
    );
}
