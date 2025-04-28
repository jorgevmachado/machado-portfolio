import React, { useEffect } from 'react';

export interface ResizeProps {
  onMobile?: () => void;
  onTablet?: () => void;
  onDesktop?: () => void;
  onWidescreen?: () => void;
  onFullHD?: () => void;
}

type Medias = {
  mobile: MediaQueryList;
  tablet: MediaQueryList;
  desktop: MediaQueryList;
  widescreen: MediaQueryList;
  fullHD: MediaQueryList;
};

export enum DeviceBreakpoints {
  MAX_MOBILE = '(max-width: 719px)',
  MIN_TABLET = '(min-width: 720px)',
  MAX_TABLET = '(max-width: 1023px)',
  MIN_DESKTOP = '(min-width: 1024px)',
  MAX_DESKTOP = '(max-width: 1279px)',
  MIN_WIDESCREEN = '(min-width: 1280px)',
  MAX_WIDESCREEN = '(max-width: 1439px)',
  MIN_FULL_HD = '(min-width: 1440px)',
}

export default function useResize(
  { onMobile, onTablet, onDesktop, onWidescreen, onFullHD }: ResizeProps,
  deps: React.DependencyList = [],
) {
  const mapCallbacks = {
    mobile: onMobile,
    tablet: onTablet,
    desktop: onDesktop,
    widescreen: onWidescreen,
    fullHD: onFullHD,
  };

  const medias: Medias = {
    mobile: window?.matchMedia(DeviceBreakpoints.MAX_MOBILE),
    tablet: window?.matchMedia(
      `${DeviceBreakpoints.MIN_TABLET} and ${DeviceBreakpoints.MAX_TABLET}`,
    ),
    desktop: window?.matchMedia(
      `${DeviceBreakpoints.MIN_DESKTOP} and ${DeviceBreakpoints.MAX_DESKTOP}`,
    ),
    widescreen: window?.matchMedia(
      `${DeviceBreakpoints.MIN_WIDESCREEN} and ${DeviceBreakpoints.MAX_WIDESCREEN}`,
    ),
    fullHD: window?.matchMedia(DeviceBreakpoints.MIN_FULL_HD),
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialize(medias);
    }
  }, []);

  const initialize = (medias: Medias) => {
    const key = Object.keys(medias).find(
      (key) => medias[key as keyof Medias].matches,
    ) as keyof typeof mapCallbacks;
    mapCallbacks[key]?.();
  };

  useEffect(() => {
    if (typeof window !== 'undefined'){
      Object.keys(medias).forEach((key) => {
        const mediaKey = key as keyof Medias;
        medias[mediaKey].addEventListener('change', handleMediaChange(mediaKey));
      });
      return () => {
        Object.keys(medias).forEach((key) => {
          const mediaKey = key as keyof Medias;
          medias[mediaKey].removeEventListener(
              'change',
              handleMediaChange(mediaKey),
          );
        });
      };
    }
  }, [deps]);

  const handleMediaChange =
    (key: keyof Medias) => (event: MediaQueryListEvent) => {
      if (mapCallbacks[key] && event.matches) {
        mapCallbacks[key]!();
      }
    };
}
