import type { Route } from '../../../utils';

export interface SidebarProps {
  menu: Array<Route>;
  onLinkClick?: (path: string) => void;
}