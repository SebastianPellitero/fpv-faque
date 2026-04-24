import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNavbarScroll } from '../useNavbarScroll';

describe('useNavbarScroll', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: 0,
        });
    });

    it('returns false when page has not scrolled', () => {
        const { result } = renderHook(() => useNavbarScroll());
        expect(result.current).toBe(false);
    });

    it('returns false when scroll is below default threshold (60)', () => {
        window.scrollY = 59;
        const { result } = renderHook(() => useNavbarScroll());
        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe(false);
    });

    it('returns true when scroll exceeds default threshold (60)', () => {
        const { result } = renderHook(() => useNavbarScroll());
        act(() => {
            window.scrollY = 61;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe(true);
    });

    it('returns true at exactly threshold + 1', () => {
        const { result } = renderHook(() => useNavbarScroll(100));
        act(() => {
            window.scrollY = 101;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe(true);
    });

    it('returns false at exactly the threshold', () => {
        const { result } = renderHook(() => useNavbarScroll(100));
        act(() => {
            window.scrollY = 100;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe(false);
    });

    it('respects a custom threshold', () => {
        const { result } = renderHook(() => useNavbarScroll(200));
        act(() => {
            window.scrollY = 150;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe(false);

        act(() => {
            window.scrollY = 201;
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe(true);
    });

    it('removes scroll listener on unmount', () => {
        const removeSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useNavbarScroll());
        unmount();
        expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
        removeSpy.mockRestore();
    });
});
