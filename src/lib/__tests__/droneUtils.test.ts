import { describe, it, expect } from 'vitest';
import { formatPurchaseDate, getDroneInitials } from '../droneUtils';

describe('formatPurchaseDate', () => {
    it('formats a full YYYY-MM date to short month and year', () => {
        // Use a fixed locale-independent check — month name varies by locale,
        // so we verify the year appears and the result is a non-empty string
        const result = formatPurchaseDate('2024-01');
        expect(result).toContain('2024');
        expect(result.length).toBeGreaterThan(4);
    });

    it('returns just the year when no month is provided', () => {
        expect(formatPurchaseDate('2023')).toBe('2023');
    });

    it('handles all 12 months without throwing', () => {
        for (let m = 1; m <= 12; m++) {
            const month = String(m).padStart(2, '0');
            expect(() => formatPurchaseDate(`2024-${month}`)).not.toThrow();
        }
    });

    it('handles month 12 (December)', () => {
        const result = formatPurchaseDate('2023-12');
        expect(result).toContain('2023');
    });

    it('handles month 01 (January)', () => {
        const result = formatPurchaseDate('2025-01');
        expect(result).toContain('2025');
    });
});

describe('getDroneInitials', () => {
    it('returns first two words initials uppercased', () => {
        expect(getDroneInitials('DJI Avata 2')).toBe('DA');
    });

    it('returns single initial for a one-word name', () => {
        expect(getDroneInitials('Drone')).toBe('D');
    });

    it('uses only the first two words even for longer names', () => {
        expect(getDroneInitials('Alpha Beta Gamma Delta')).toBe('AB');
    });

    it('uppercases lowercase input', () => {
        expect(getDroneInitials('mini pro')).toBe('MP');
    });

    it('handles names that are already uppercase', () => {
        expect(getDroneInitials('FPV RACER')).toBe('FR');
    });

    it('handles a single character name', () => {
        expect(getDroneInitials('X')).toBe('X');
    });

    it('handles extra spaces between words', () => {
        expect(getDroneInitials('Drone  One')).toBe('DO');
    });
});
