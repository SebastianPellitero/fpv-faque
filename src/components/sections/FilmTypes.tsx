'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';

interface FilmCategory {
    key: string;
    title: string;
    description: string;
}

const CATEGORY_NUMBERS = ['01', '02', '03', '04', '05'];

export function FilmTypes() {
    const t = useTranslations('filmTypes');
    const sectionRef = useRef<HTMLElement>(null);

    const categories = t.raw('categories') as FilmCategory[];

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
                        once: true,
                    },
                }
            );

            const cards = sectionRef.current.querySelectorAll('.film-type-card');
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
                            once: true,
                        },
                    }
                );
            }
        },
        { scope: sectionRef, dependencies: [categories.length] }
    );

    return (
        <section
            id='services'
            ref={sectionRef}
            className='bg-[var(--color-background)] section-padding'
        >
            <div className='max-w-7xl mx-auto'>
                <div className='section-heading mb-12 opacity-0'>
                    <span className='text-xs text-[var(--color-accent)] uppercase tracking-[0.3em] mb-3 block'>
                        Services
                    </span>
                    <h2 className='text-3xl md:text-5xl font-display font-bold text-[var(--color-foreground)]'>
                        {t('sectionTitle')}
                    </h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
                    {categories.map((category, index) => (
                        <div
                            key={category.key}
                            className='film-type-card opacity-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 flex flex-col gap-4'
                        >
                            <span className='font-display font-bold text-5xl leading-none text-[var(--color-accent)]'>
                                {CATEGORY_NUMBERS[index]}
                            </span>
                            <h3 className='font-display font-bold text-xl text-[var(--color-foreground)]'>
                                {category.title}
                            </h3>
                            <p className='text-sm leading-relaxed text-[var(--color-muted)]'>
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
