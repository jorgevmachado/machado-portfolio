import type { RouteProps } from '../../../routes/interface';

export interface SidebarProps {
  menu: Array<RouteProps>;
  theme?: TTheme;
  onLinkClick?: (path: string) => void;
}

export type TTheme = 'geek' | 'finance' | 'law';