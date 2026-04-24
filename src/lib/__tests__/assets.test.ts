import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { assetUrl } from '../assets';

describe('assetUrl', () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_PATH;

    afterEach(() => {
        process.env.NEXT_PUBLIC_BASE_PATH = originalEnv;
    });

    it('returns path unchanged when base path is not set', () => {
        delete process.env.NEXT_PUBLIC_BASE_PATH;
        expect(assetUrl('/images/hero.jpg')).toBe('/images/hero.jpg');
    });

    it('returns path unchanged when base path is empty string', () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '';
        expect(assetUrl('/images/hero.jpg')).toBe('/images/hero.jpg');
    });

    it('prepends base path when set', () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/fpv-drones';
        expect(assetUrl('/images/hero.jpg')).toBe('/fpv-drones/images/hero.jpg');
    });

    it('concatenates without inserting a slash for paths without leading slash', () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/base';
        // assetUrl is a direct concat — callers are responsible for the leading slash
        expect(assetUrl('images/hero.jpg')).toBe('/baseimages/hero.jpg');
    });

    it('handles nested paths', () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/base';
        expect(assetUrl('/images/fleet/drone1.jpg')).toBe('/base/images/fleet/drone1.jpg');
    });

    it('handles video paths', () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/app';
        expect(assetUrl('/videos/hero-loop.mp4')).toBe('/app/videos/hero-loop.mp4');
    });
});
