'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';
import { VideoBackground } from '@/components/ui/VideoBackground';

// Register useGSAP globally once
gsap.registerPlugin();

function splitWords(text: string): string[] {
    return text.split(' ');
}

export function Hero() {
    const t = useTranslations('hero');
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);

    const headline = t('headline');
    const words = splitWords(headline);

    useGSAP(
        () => {
            const wordEls = headlineRef.current?.querySelectorAll('.word');
            if (!wordEls?.length) return;

            gsap.fromTo(
                wordEls,
                { opacity: 0, y: 40, rotationX: -30 },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.07,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.3
                }
            );

            gsap.fromTo(
                subRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: words.length * 0.07 + 0.6
                }
            );

            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    delay: words.length * 0.07 + 1.0
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className='relative min-h-svh flex flex-col'>
            {/* Dark cinematic overlay — overflow-hidden here clips the bg, not the content */}
            <div className='absolute inset-0 overflow-hidden bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10' />
            {/* Background video — replace src with actual file when available
            <VideoBackground
                src='/videos/hero-loop.mp4'
                webmSrc='/videos/hero-loop.webm'
                poster='/images/hero-poster.jpg'
            /> */}
            {/* Content */}
            <div
                className='relative z-20 flex-1 flex items-center justify-center text-center px-6'
                style={{ paddingTop: 'var(--navbar-height)' }}
            >
                <div className='max-w-4xl'>
                    <h1
                        ref={headlineRef}
                        className='text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight text-balance mb-6'
                        style={{ perspective: '800px' }}
                    >
                        {words.map((word, i) => (
                            <span key={i} className='word inline-block mr-[0.25em]'>
                                {word}
                            </span>
                        ))}
                    </h1>
                    <a
                        ref={ctaRef}
                        href='#work'
                        className='inline-block px-8 py-3 border border-white/30 text-white text-sm tracking-widest uppercase hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300'
                    >
                        {t('sub')}
                    </a>
                </div>
            </div>

            {/* Scroll indicator — fixed height row so flex layout always reserves space for it */}
            <div className='relative z-20 h-24 flex flex-col items-center justify-end gap-2 opacity-50 pb-6'>
                <span className='text-white text-xs tracking-[0.3em] uppercase'>
                    Scroll
                </span>
                <div className='w-px h-8 bg-white/40 animate-pulse' />
            </div>
        </section>
    );
}
