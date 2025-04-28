import { useEffect, useState } from 'react';

enum EDeviceBreakpoints {
  MAX_MOBILE = '(max-width: 719px)',
  MIN_TABLET = '(min-width: 720px)',
  MAX_TABLET = '(max-width: 1023px)',
  MIN_DESKTOP = '(min-width: 1024px)',
  MAX_DESKTOP = '(max-width: 1279px)',
  MIN_WIDESCREEN = '(min-width: 1280px)',
  MAX_WIDESCREEN = '(max-width: 1439px)',
  MIN_FULL_HD = '(min-width: 1440px)',
}

type Breakpoint =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'widescreen'
  | 'full-hd';

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.warn(
        'useBreakpoint: Hook being used outside of a browser environment.',
      );
      return;
    }
    const queries: Record<Breakpoint, MediaQueryList> = {
      mobile: window.matchMedia(EDeviceBreakpoints.MAX_MOBILE),
      tablet: window.matchMedia(
        `${EDeviceBreakpoints.MIN_TABLET} and ${EDeviceBreakpoints.MAX_TABLET}`,
      ),
      desktop: window.matchMedia(
        `${EDeviceBreakpoints.MIN_DESKTOP} and ${EDeviceBreakpoints.MAX_DESKTOP}`,
      ),
      widescreen: window.matchMedia(
        `${EDeviceBreakpoints.MIN_WIDESCREEN} and ${EDeviceBreakpoints.MAX_WIDESCREEN}`,
      ),
      'full-hd': window.matchMedia(EDeviceBreakpoints.MIN_FULL_HD),
    };
    const getActiveBreakpoint = (): Breakpoint => {
      return (
        (Object.keys(queries) as Breakpoint[]).find(
          (key) => queries[key].matches,
        ) || 'desktop'
      );
    };

    const updateBreakpoint = () => {
      setBreakpoint(getActiveBreakpoint());
    };

    Object.values(queries).forEach((query) => {
      query.addEventListener('change', updateBreakpoint);
    });

    updateBreakpoint();

    return () => {
      Object.values(queries).forEach((query) => {
        query.removeEventListener('change', updateBreakpoint);
      });
    };
  }, []);

  return { breakpoint, isMobile: breakpoint === 'mobile' };
}
