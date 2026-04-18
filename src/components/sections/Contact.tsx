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
                        <p className='text-[var(--color-muted)] text-lg leading-relaxed mb-10'>
                            {t('subheading')}
                        </p>

                        {/* Scroll hint — desktop */}
                        <div className='hidden md:flex items-center gap-3 text-[var(--color-muted)]'>
                            <div className='w-8 h-px bg-[var(--color-muted)]' />
                            <span className='text-xs uppercase tracking-[0.2em]'>
                                Scroll to continue
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
                            Let&apos;s talk
                        </span>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
