'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function FooterLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return <div className="h-7 w-22.5" />;
  }

  return (
    <Link href="/">
      <Image
        src={resolvedTheme === 'dark' ? '/centre-light.svg' : '/centre.svg'}
        alt="opphex"
        width={100}
        height={100}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}

