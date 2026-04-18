'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import { useTranslations } from 'next-intl';
import { assetUrl } from '@/lib/assets';
import { VideoBackground } from '@/components/ui/VideoBackground';

export function CinematicIntro() {
    const t = useTranslations('cinematic');
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !textRef.current) return;

            // Parallax: text moves at ~35% of scroll speed relative to section
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
                onUpdate: self => {
                    gsap.set(textRef.current, {
                        y: self.progress * -140
                    });
                }
            });

            // Fade in text when section enters
            gsap.fromTo(
                textRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true
                    }
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className='relative h-screen overflow-hidden flex items-center justify-center'
        >
            {/* Cinematic overlay — darker than hero */}
            <div className='absolute inset-0 bg-black/60 z-10' />

            <VideoBackground
                src={assetUrl('/videos/cinematic-bg.mp4')}
                webmSrc={assetUrl('/videos/cinematic-bg.webm')}
                poster={assetUrl('/images/cinematic-poster.jpg')}
            />

            {/* Parallax text layer */}
            <div
                ref={textRef}
                className='relative z-20 text-center px-6 will-change-transform'
                style={{ opacity: 0 }}
            >
                <p className='text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-none text-balance'>
                    {t('tagline')}
                </p>
                <div className='mt-6 w-16 h-px bg-[var(--color-accent)] mx-auto opacity-80' />
            </div>
        </section>
    );
}
