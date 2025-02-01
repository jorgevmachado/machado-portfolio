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

const MEDIAS = {
  mobile: DeviceBreakpoints.MAX_MOBILE,
  tablet: `${DeviceBreakpoints.MIN_TABLET} and ${DeviceBreakpoints.MAX_TABLET}`,
  desktop: `${DeviceBreakpoints.MIN_DESKTOP} and ${DeviceBreakpoints.MAX_DESKTOP}`,
  widescreen: `${DeviceBreakpoints.MIN_WIDESCREEN} and ${DeviceBreakpoints.MAX_WIDESCREEN}`,
  fullHD: DeviceBreakpoints.MIN_FULL_HD,
};

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

  useEffect(() => {
    const medias = getMedias();
    initialize(medias);
  }, []);

  const getMedias = (): Medias => {
    return {
      mobile: window.matchMedia(MEDIAS.mobile),
      tablet: window.matchMedia(MEDIAS.tablet),
      desktop: window.matchMedia(MEDIAS.desktop),
      widescreen: window.matchMedia(MEDIAS.widescreen),
      fullHD: window.matchMedia(MEDIAS.fullHD),
    };
  };

  const initialize = (medias: Medias) => {
    const key = Object.keys(medias).find(
      (key) => medias[key as keyof Medias].matches,
    ) as keyof typeof mapCallbacks;
    mapCallbacks[key]?.();
  };

  useEffect(() => {
    const medias = getMedias();
    onMobile && medias.mobile.addEventListener('change', makeMobile);
    onTablet && medias.tablet.addEventListener('change', makeTablet);
    onDesktop && medias.desktop.addEventListener('change', makeDesktop);
    onWidescreen &&
      medias.widescreen.addEventListener('change', makeWidescreen);
    onFullHD && medias.fullHD.addEventListener('change', makeFullHD);
    return () => {
      onMobile && medias.mobile.removeEventListener('change', makeMobile);
      onTablet && medias.tablet.removeEventListener('change', makeTablet);
      onDesktop && medias.desktop.removeEventListener('change', makeDesktop);
      onWidescreen &&
        medias.widescreen.removeEventListener('change', makeWidescreen);
      onFullHD && medias.fullHD.removeEventListener('change', makeFullHD);
    };
  }, [deps]);

  const makeMobile = (event: MediaQueryListEvent) => {
    if (onMobile) {
      checker(event, onMobile);
    }
  };

  const makeTablet = (event: MediaQueryListEvent) => {
    if (onTablet) {
      checker(event, onTablet);
    }
  };

  const makeDesktop = (event: MediaQueryListEvent) => {
    if (onDesktop) {
      checker(event, onDesktop);
    }
  };

  const makeWidescreen = (event: MediaQueryListEvent) => {
    if (onWidescreen) {
      checker(event, onWidescreen);
    }
  };

  const makeFullHD = (event: MediaQueryListEvent) => {
    if (onFullHD) {
      checker(event, onFullHD);
    }
  };

  const checker = (event: MediaQueryListEvent, fn: () => void) => {
    if (event.matches) {
      fn();
    }
  };
}
