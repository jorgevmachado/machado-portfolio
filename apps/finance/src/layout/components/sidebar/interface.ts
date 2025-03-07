import type { RouteProps } from '../../../routes/interface';

export interface SidebarProps {
  menu: Array<RouteProps>;
  theme?: TTheme;
}

export type TTheme = 'geek' | 'finance' | 'law';