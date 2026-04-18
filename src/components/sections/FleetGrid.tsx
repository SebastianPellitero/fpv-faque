'use client';

import { useCallback, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { DroneCard } from '@/components/ui/DroneCard';
import type { DroneEntry } from '@/components/ui/DroneCard';

export function FleetGrid() {
    const t = useTranslations('fleet');
    const sectionRef = useRef<HTMLElement>(null);

    const drones = t.raw('drones') as DroneEntry[];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: false,
        containScroll: 'trimSnaps',
    });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

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

            const cards = sectionRef.current.querySelectorAll('.fleet-card');
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
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 65%',
                            once: true
                        }
                    }
                );
            }
        },
        { scope: sectionRef, dependencies: [drones.length] }
    );

    return (
        <section
            id='fleet'
            ref={sectionRef}
            className='bg-[var(--color-surface)] section-padding'
        >
            <div className='max-w-7xl mx-auto'>
                {/* Heading */}
                <div className='section-heading mb-10 opacity-0'>
                    <span className='text-xs text-[var(--color-accent)] uppercase tracking-[0.3em] mb-3 block'>
                        Fleet
                    </span>
                    <h2 className='text-3xl md:text-5xl font-display font-bold text-[var(--color-foreground)]'>
                        {t('sectionTitle')}
                    </h2>
                </div>

                {/* Mobile: Embla carousel */}
                <div className='md:hidden'>
                    <div className='relative'>
                        <div ref={emblaRef} className='overflow-hidden' style={{ paddingRight: '10%' }}>
                            <div className='flex gap-4'>
                                {drones.map(drone => (
                                    <div key={drone.name} className='flex-none w-[80vw]'>
                                        <DroneCard drone={drone} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile carousel nav */}
                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <button
                            onClick={scrollPrev}
                            aria-label='Previous drone'
                            className='w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)]'
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={scrollNext}
                            aria-label='Next drone'
                            className='w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)]'
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                {/* Desktop: grid */}
                <div className='hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6'>
                    {drones.map(drone => (
                        <DroneCard key={drone.name} drone={drone} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ChevronLeft() {
    return (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}
            strokeLinecap='round' strokeLinejoin='round' className='w-4 h-4' aria-hidden='true'>
            <polyline points='15 18 9 12 15 6' />
        </svg>
    );
}

function ChevronRight() {
    return (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}
            strokeLinecap='round' strokeLinejoin='round' className='w-4 h-4' aria-hidden='true'>
            <polyline points='9 18 15 12 9 6' />
        </svg>
    );
}
