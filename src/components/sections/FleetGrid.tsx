'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';
import { DroneCard } from '@/components/ui/DroneCard';
import type { DroneEntry } from '@/components/ui/DroneCard';

export function FleetGrid() {
    const t = useTranslations('fleet');
    const sectionRef = useRef<HTMLElement>(null);

    const drones = t.raw('drones') as DroneEntry[];

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Heading fade-up
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

            // Cards stagger-in
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

                {/* Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {drones.map(drone => (
                        <DroneCard key={drone.name} drone={drone} />
                    ))}
                </div>
            </div>
        </section>
    );
}
