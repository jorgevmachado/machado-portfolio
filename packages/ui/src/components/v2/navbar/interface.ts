import type { User } from '@repo/business/auth/interface';

export interface NavbarProps {
    user?: User;
    title: string;
    theme?: TTheme;
}

export type TTheme = 'geek' | 'finance' | 'law';