'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { DroneCard } from '@/components/ui/DroneCard';
import type { DroneEntry } from '@/components/ui/DroneCard';

type FilterValue = 'all' | DroneEntry['status'];

export function FleetGrid() {
    const t = useTranslations('fleet');
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimatedRef = useRef(false);

    const drones = t.raw('drones') as DroneEntry[];

    const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredDrones = activeFilter === 'all'
        ? drones
        : drones.filter(d => d.status === activeFilter);

    // Collect only statuses that exist in the data, preserving a sensible order
    const STATUS_ORDER: DroneEntry['status'][] = ['active', 'pending', 'repair', 'retired', 'sold', 'lost', 'destroyed'];
    const presentStatuses = STATUS_ORDER.filter(s => drones.some(d => d.status === s));

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: false,
        containScroll: 'trimSnaps',
    });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    // Track selected carousel index for dot indicators
    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
    }, [emblaApi]);

    // Reset carousel position when filter changes
    useEffect(() => {
        emblaApi?.scrollTo(0, true);
        setSelectedIndex(0);
    }, [emblaApi, activeFilter]);

    // Initial scroll-triggered animation
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

            const cardAnimOpts = {
                opacity: 1, y: 0, scale: 1,
                duration: 0.8, ease: 'power3.out', stagger: 0.08,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    once: true,
                    onEnter: () => { hasAnimatedRef.current = true; }
                }
            };
            const mobileCards = sectionRef.current.querySelectorAll('.js-mobile-fleet .fleet-card');
            const desktopCards = sectionRef.current.querySelectorAll('.js-desktop-fleet .fleet-card');
            if (mobileCards.length) gsap.fromTo(mobileCards, { opacity: 0, y: 50, scale: 0.96 }, cardAnimOpts);
            if (desktopCards.length) gsap.fromTo(desktopCards, { opacity: 0, y: 50, scale: 0.96 }, cardAnimOpts);
        },
        { scope: sectionRef, dependencies: [drones.length] }
    );

    // Animate cards in when filter changes (after initial animation has played)
    useEffect(() => {
        if (!hasAnimatedRef.current || !sectionRef.current) return;
        const mobileCards = sectionRef.current.querySelectorAll('.js-mobile-fleet .fleet-card');
        const desktopCards = sectionRef.current.querySelectorAll('.js-desktop-fleet .fleet-card');
        const animOpts = { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05 };
        if (mobileCards.length) { gsap.killTweensOf(mobileCards); gsap.fromTo(mobileCards, { opacity: 0, y: 20 }, animOpts); }
        if (desktopCards.length) { gsap.killTweensOf(desktopCards); gsap.fromTo(desktopCards, { opacity: 0, y: 20 }, animOpts); }
    }, [activeFilter]);

    return (
        <section
            id='fleet'
            ref={sectionRef}
            className='bg-[var(--color-surface)] section-padding'
        >
            <div className='max-w-7xl mx-auto'>
                {/* Heading */}
                <div className='section-heading mb-8 opacity-0'>
                    <span className='text-xs text-[var(--color-accent)] uppercase tracking-[0.3em] mb-3 block'>
                        Fleet
                    </span>
                    <h2 className='text-3xl md:text-5xl font-display font-bold text-[var(--color-foreground)]'>
                        {t('sectionTitle')}
                    </h2>
                </div>

                {/* Filter tabs */}
                <div className='flex flex-wrap gap-2 mb-8'>
                    <FilterPill
                        label={t('filterAll')}
                        active={activeFilter === 'all'}
                        onClick={() => setActiveFilter('all')}
                    />
                    {presentStatuses.map(status => (
                        <FilterPill
                            key={status}
                            label={t(STATUS_KEY[status])}
                            active={activeFilter === status}
                            onClick={() => setActiveFilter(status)}
                        />
                    ))}
                </div>

                {/* Mobile: Embla carousel */}
                <div className='md:hidden js-mobile-fleet'>
                    <div className='relative'>
                        <div ref={emblaRef} className='overflow-hidden' style={{ paddingRight: '10%' }}>
                            <div className='flex gap-4'>
                                {filteredDrones.map(drone => (
                                    <div key={drone.name} className='flex-none w-[80vw]'>
                                        <DroneCard drone={drone} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile carousel nav + dots */}
                    <div className='flex flex-col items-center gap-4 mt-6'>
                        <div className='flex items-center gap-4'>
                            <button
                                onClick={scrollPrev}
                                aria-label='Previous drone'
                                className='w-11 h-11 flex items-center justify-center rounded-full border border-border text-muted'
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={scrollNext}
                                aria-label='Next drone'
                                className='w-11 h-11 flex items-center justify-center rounded-full border border-border text-muted'
                            >
                                <ChevronRight />
                            </button>
                        </div>
                        {/* Dot indicators */}
                        {filteredDrones.length > 1 && (
                            <div className='flex items-center gap-1.5' aria-hidden='true'>
                                {filteredDrones.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => emblaApi?.scrollTo(i)}
                                        className={`rounded-full transition-all duration-200 ${
                                            i === selectedIndex
                                                ? 'w-4 h-1.5 bg-accent'
                                                : 'w-1.5 h-1.5 bg-border'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop: grid */}
                <div className='hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 js-desktop-fleet'>
                    {filteredDrones.map(drone => (
                        <DroneCard key={drone.name} drone={drone} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const STATUS_KEY: Record<DroneEntry['status'], string> = {
    active:    'statusActive',
    repair:    'statusRepair',
    pending:   'statusPending',
    retired:   'statusRetired',
    sold:      'statusSold',
    destroyed: 'statusDestroyed',
    lost:      'statusLost',
};

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors duration-150 ${
                active
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-muted hover:border-foreground hover:text-foreground'
            }`}
        >
            {label}
        </button>
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
