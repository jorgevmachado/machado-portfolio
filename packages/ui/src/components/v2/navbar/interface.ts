import type { User } from '@repo/business/auth/interface';

export interface NavbarProps {
    user?: User;
    title: string;
}