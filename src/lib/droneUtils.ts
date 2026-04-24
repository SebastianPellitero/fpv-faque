/**
 * Format a "YYYY-MM" purchase date string to a human-readable month/year.
 * e.g. "2024-01" → "Jan 2024"
 * Falls back to the year alone if no month is present.
 */
export function formatPurchaseDate(purchaseDate: string): string {
    const [year, month] = purchaseDate.split('-');
    if (!month) return year;
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

/**
 * Derive up to two uppercase initials from a drone name.
 * e.g. "DJI Avata 2" → "DA", "Drone" → "D"
 */
export function getDroneInitials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
}
