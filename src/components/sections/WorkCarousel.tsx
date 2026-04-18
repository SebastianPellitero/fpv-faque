'use client';

import { useCallback, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { VideoCard } from '@/components/ui/VideoCard';

interface VideoEntry {
    id: string;
    description: string;
}

export function WorkCarousel() {
    const t = useTranslations('work');
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const videos = t.raw('videos') as VideoEntry[];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        dragFree: false,
        containScroll: 'trimSnaps',
    });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Section heading fade-up
            gsap.fromTo(
                sectionRef.current.querySelector('.section-heading'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true
                    }
                }
            );

            // Carousel cards stagger-in
            const cards = sectionRef.current.querySelectorAll('.carousel-card');
            if (cards.length) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 50, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 65%',
                            once: true
                        }
                    }
                );
            }
        },
        { scope: sectionRef, dependencies: [videos.length] }
    );

    return (
        <section
            id='work'
            ref={sectionRef}
            className='bg-[var(--color-background)] section-padding'
        >
            <div className='max-w-7xl mx-auto'>
                {/* Heading row */}
                <div className='section-heading mb-10 opacity-0'>
                    <span className='text-xs text-[var(--color-accent)] uppercase tracking-[0.3em] mb-3 block'>
                        Portfolio
                    </span>
                    <h2 className='text-3xl md:text-5xl font-display font-bold text-[var(--color-foreground)]'>
                        {t('sectionTitle')}
                    </h2>
                </div>

                {/* Carousel with side arrows */}
                <div className='relative'>
                    {/* Left arrow */}
                    <button
                        onClick={scrollPrev}
                        aria-label='Previous video'
                        className='hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200'
                    >
                        <ChevronLeft />
                    </button>

                    {/* Embla viewport — clips the sliding track but not the arrow buttons */}
                    <div ref={emblaRef} className='overflow-hidden' style={{ paddingRight: '10%' }}>
                        <div className='flex gap-6' ref={cardsRef}>
                            {videos.map(video => (
                                <div
                                    key={video.id}
                                    className='carousel-card flex-none w-[85vw] md:w-[45%] lg:w-[38%] opacity-0'
                                >
                                    <VideoCard
                                        videoId={video.id}
                                        description={video.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={scrollNext}
                        aria-label='Next video'
                        className='hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200'
                    >
                        <ChevronRight />
                    </button>
                </div>

                {/* Mobile nav */}
                <div className='flex md:hidden items-center justify-center gap-4 mt-8'>
                    <button
                        onClick={scrollPrev}
                        aria-label='Previous video'
                        className='w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)]'
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={scrollNext}
                        aria-label='Next video'
                        className='w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)]'
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}

function ChevronLeft() {
    return (
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
            <polyline points='15 18 9 12 15 6' />
        </svg>
    );
}

function ChevronRight() {
    return (
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
    );
}
