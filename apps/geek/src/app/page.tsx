'use client';
import Button from '@repo/ds/components/button/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>WEB PAGE</h1>
      <Link href="/about">about</Link>
      <Button>CLICK HERE</Button>
    </main>
  );
}
