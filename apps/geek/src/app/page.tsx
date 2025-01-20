'use client';
import Link from 'next/link';

import Button from '@repo/ds/components/button/Button';

export default function Home() {
  return (
    <main>
      <h1>WEB PAGE</h1>
      <Link href="/about">about</Link>
      <Button>CLICK HERE</Button>
    </main>
  );
}
