import type { Logo, Menu } from './interface';

export const LOGO: Logo = {
  src: 'https://via.placeholder.com/150',
  alt: 'logo',
  title: 'logo',
  width: 80,
  height: 80,
  onClick: () => alert('Open Home'),
};

export const PROFILE_MENU: Menu['items'][number] = {
  key: 'profile',
  label: 'Profile',
  items: [
    {
      key: 'profile',
      icon: 'user',
      label: 'My data',
      onRedirect: () => alert('Open Page Profile'),
    },
  ],
};

export const LOGOUT_MENU: Menu['items'][number] = {
  key: 'logout',
  icon: 'exit',
  label: 'logout',
  onRedirect: () => alert('Logout'),
};

export const NAVBAR: Menu = {
  key: 'navbar',
  items: [
    {
      key: 'about',
      label: 'Page',
      onRedirect: () => alert('Open Page Page'),
    },
    {
      key: 'options',
      label: 'Options',
      items: [
        {
          key: 'option1',
          label: 'Option 1',
          onRedirect: () => alert('Open Page Option 1'),
        },
        {
          key: 'option2',
          label: 'Option 2',
          onRedirect: () => alert('Open Page Option 2'),
        },
      ],
    },
    {
      key: 'help',
      label: 'Help',
      onRedirect: () => alert('Open Page Help'),
    },
  ],
};

export const SIDEBAR: Menu = {
  key: 'sidebar',
  items: [
    PROFILE_MENU,
    {
      key: 'favorite',
      label: 'Favorite',
      items: [
        {
          key: 'favorite',
          icon: 'like',
          label: 'Favorite',
          onRedirect: () => alert('Open Page Favorite'),
        },
      ],
    },
  ],
};

export const MENU: Array<Menu> = [NAVBAR, SIDEBAR];
