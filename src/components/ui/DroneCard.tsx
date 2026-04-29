import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { formatPurchaseDate, getDroneInitials } from '@/lib/droneUtils';

export interface DroneEntry {
    name: string;
    status: 'active' | 'retired' | 'repair' | 'sold' | 'pending';
    purchaseDate?: string;
    specs: string[];
    image: string;
    description?: string;
}

interface DroneCardProps {
    drone: DroneEntry;
}

const STATUS_STYLES: Record<DroneEntry['status'], { dot: string; text: string }> = {
    active:  { dot: 'bg-[var(--color-accent)]',  text: 'text-[var(--color-accent)]' },
    repair:  { dot: 'bg-amber-400',               text: 'text-amber-400' },
    pending: { dot: 'bg-blue-400',                text: 'text-blue-400' },
    retired: { dot: 'bg-[var(--color-muted)]',    text: 'text-[var(--color-muted)]' },
    sold:    { dot: 'bg-[var(--color-muted)]',    text: 'text-[var(--color-muted)]' },
};

const STATUS_KEY: Record<DroneEntry['status'], string> = {
    active:  'statusActive',
    repair:  'statusRepair',
    pending: 'statusPending',
    retired: 'statusRetired',
    sold:    'statusSold',
};

function DronePlaceholder({ name }: { name: string }) {
    const initials = getDroneInitials(name);

    return (
        <div
            className='absolute inset-0 flex items-center justify-center'
            style={{
                backgroundImage: `
                    linear-gradient(var(--color-border) 1px, transparent 1px),
                    linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
                backgroundColor: 'var(--color-background)',
            }}
        >
            <span className='font-display font-bold text-4xl text-[var(--color-border)] select-none'>
                {initials}
            </span>
        </div>
    );
}

export function DroneCard({ drone }: DroneCardProps) {
    const t = useTranslations('fleet');
    const style = STATUS_STYLES[drone.status];
    const [imgError, setImgError] = useState(false);
    const hasImage = drone.image && !imgError;

    const formattedDate = drone.purchaseDate ? formatPurchaseDate(drone.purchaseDate) : null;

    return (
        <div className='fleet-card flex flex-col bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] opacity-0'>
            {/* Photo */}
            <div className='relative w-full aspect-[4/3] bg-[var(--color-background)] overflow-hidden'>
                {hasImage ? (
                    <Image
                        src={drone.image}
                        alt={drone.name}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <DronePlaceholder name={drone.name} />
                )}
            </div>

            {/* Body */}
            <div className='p-5 flex flex-col gap-3'>
                {/* Name + status */}
                <div className='flex items-center justify-between gap-2'>
                    <h3 className='font-display font-bold text-[var(--color-foreground)] text-lg leading-tight'>
                        {drone.name}
                    </h3>
                    <span className={`flex items-center gap-1.5 text-xs font-medium shrink-0 ${style.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {t(STATUS_KEY[drone.status])}
                    </span>
                </div>

                {/* Description */}
                {drone.description && (
                    <p className='text-sm text-[var(--color-muted)] leading-relaxed'>
                        {drone.description}
                    </p>
                )}

                {/* Purchase date */}
                {formattedDate && (
                    <p className='text-xs text-[var(--color-muted)]'>
                        {t('purchased')}: {formattedDate}
                    </p>
                )}

                {/* Spec pills */}
                {drone.specs.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                        {drone.specs.map(spec => (
                            <span
                                key={spec}
                                className='text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]'
                            >
                                {spec}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
