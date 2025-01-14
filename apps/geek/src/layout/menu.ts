import { router } from 'next/client';

import { Menu } from '@repo/ui/utils/menu/interface';

const navbar: Menu = {
  key: 'navbar',
  items: [
    {
      key: 'about',
      label: 'Sobre',
      onRedirect: () => router.push('/about'),
    },
    {
      key: 'contact',
      label: 'Fale Conosco',
      onRedirect: () => router.push('/contact'),
    },
  ],
};

const sidebar: Menu = {
  key: 'sidebar',
  items: [
    {
      key: 'profile',
      icon: 'user',
      label: 'Meus Dados',
      onRedirect: () => router.push('/profile'),
    },
  ],
};

export const menu: Array<Menu> = [navbar, sidebar];

export const logout: Menu['items'][number] = {
  key: 'logout',
  icon: 'exit',
  label: 'logout',
  onRedirect: () => router.push('/logout'),
};
