'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
    src: string;
    webmSrc?: string;
    poster?: string;
    className?: string;
}

export function VideoBackground({
    src,
    webmSrc,
    poster,
    className = ''
}: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // React's `muted` prop is unreliable — set it imperatively
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            poster={poster}
            className={`absolute inset-0 w-full h-full object-cover ${className}`}
            aria-hidden='true'
        >
            {webmSrc && <source src={webmSrc} type='video/webm' />}
            <source src={src} type='video/mp4' />
        </video>
    );
}
