'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/ui/ContactForm';

export function Contact() {
    const t = useTranslations('contact');
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!outerRef.current || !innerRef.current) return;

            // Horizontal scroll-jack — desktop only (≥768px)
            ScrollTrigger.matchMedia({
                '(min-width: 768px)': function () {
                    const inner = innerRef.current!;
                    const outer = outerRef.current!;

                    const getScrollDistance = () =>
                        inner.scrollWidth - window.innerWidth;

                    const tween = gsap.to(inner, {
                        x: () => -getScrollDistance(),
                        ease: 'none',
                        scrollTrigger: {
                            trigger: outer,
                            pin: true,
                            scrub: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                            end: () => '+=' + getScrollDistance()
                        }
                    });

                    return () => {
                        tween.kill();
                    };
                }
            });
        },
        { scope: outerRef }
    );

    return (
        <div id='contact' ref={outerRef} className='overflow-hidden'>
            {/* Inner — two panels side by side on desktop, stacked on mobile */}
            <div
                ref={innerRef}
                className='flex flex-col md:flex-row'
                style={{ width: '200vw' }}
            >
                {/* Panel 1 — Teaser / CTA */}
                <div className='w-screen min-h-screen flex items-center justify-center bg-[var(--color-background)] section-padding relative'>
                    {/* Decorative accent line */}
                    <div className='absolute top-0 left-0 right-0 h-px bg-[var(--color-border)]' />

                    <div className='max-w-xl'>
                        <span className='text-xs text-[var(--color-accent)] uppercase tracking-[0.3em] mb-6 block'>
                            Contact
                        </span>
                        <h2 className='text-5xl md:text-7xl font-display font-bold text-[var(--color-foreground)] leading-none text-balance mb-8'>
                            {t('heading')}
                        </h2>
                        <p className='text-[var(--color-muted)] text-lg leading-relaxed mb-8'>
                            {t('subheading')}
                        </p>

                        {/* Social links */}
                        <div className='flex items-center gap-5 mb-10'>
                            <span className='text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]'>
                                {t('connectWith')}
                            </span>
                            <div className='flex items-center gap-4'>
                                <a
                                    href='https://www.instagram.com/faquefpv'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='Instagram'
                                    className='text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200'
                                >
                                    <InstagramIcon />
                                </a>
                                <a
                                    href='https://www.tiktok.com/@faquefpv'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='TikTok'
                                    className='text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200'
                                >
                                    <TikTokIcon />
                                </a>
                                <a
                                    href='https://www.youtube.com/@faqueretermax'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='YouTube'
                                    className='text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200'
                                >
                                    <YouTubeIcon />
                                </a>
                            </div>
                        </div>

                        {/* Scroll hint — desktop */}
                        <div className='hidden md:flex items-center gap-3 text-[var(--color-muted)]'>
                            <div className='w-8 h-px bg-[var(--color-muted)]' />
                            <span className='text-xs uppercase tracking-[0.2em]'>
                                {t('scrollToContinue')}
                            </span>
                            <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth={1.5}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='w-4 h-4'
                                aria-hidden='true'
                            >
                                <polyline points='9 18 15 12 9 6' />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Panel 2 — Contact form */}
                <div className='w-screen min-h-screen flex items-center justify-center bg-[var(--color-surface)] section-padding'>
                    <div className='max-w-lg w-full'>
                        <span className='text-xs text-[var(--color-accent)] uppercase tracking-[0.3em] mb-6 block'>
                            {t('letsTalk')}
                        </span>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InstagramIcon() {
    return (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5' aria-hidden='true'>
            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5' aria-hidden='true'>
            <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z' />
        </svg>
    );
}

function YouTubeIcon() {
    return (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5' aria-hidden='true'>
            <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
    );
}
