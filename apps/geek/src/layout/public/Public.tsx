import React from 'react';

import Blank from '@repo/ui/layout/blank/Blank';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <Blank>{children}</Blank>;
}
