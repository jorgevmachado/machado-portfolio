import type { Route } from '../../../utils';

export interface SidebarProps {
  menu: Array<Route>;
  onToggle?: (value: boolean) => void;
  onLinkClick?: (path: string) => void;
  isSidebarOpen?: boolean;
}