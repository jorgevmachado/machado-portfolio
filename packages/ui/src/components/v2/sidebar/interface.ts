import type { Route } from '../../../utils';

export interface SidebarProps {
  menu: Array<Route>;
  theme?: TTheme;
  onLinkClick?: (path: string) => void;
}

export type TTheme = 'geek' | 'finance' | 'law';