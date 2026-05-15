// "use client";

// import { useEffect, useState } from "react";

// import Image from "next/image";
// import Link from "next/link";
// import { useTheme } from "next-themes";

// export function Logo() {
//   const { resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Avoid hydration mismatch
//   useEffect(() => setMounted(true), []);

//   if (!mounted) {
//     // Render a placeholder with the same dimensions to avoid layout shift
//     return <div className="h-7 w-22.5" />;
//   }

//   return (
//     <Link href="/">
//       <Image
//         src={resolvedTheme === "dark" ? "/light-l.svg" : "/dark-full.svg"}
//         alt="opphex"
//         width={100}
//         height={100}
//         priority
//         className="h-9 w-auto"
//       />
//     </Link>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-7 w-22.5" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Link href="/">
      {/* Desktop logo — hidden on small screens */}
      <Image
        src={resolvedTheme === "dark" ? "/light-l.svg" : "/dark-full.svg"}
        alt="opphex"
        width={100}
        height={100}
        priority
        className="hidden sm:block h-9 w-auto"
      />
      {/* Mobile logo — hidden on larger screens */}
      <Image
        src={isDark ? '/centre-light.svg' : '/centre.svg'}
        alt="opphex"
        width={100}
        height={100}
        priority
        className="block sm:hidden h-9 w-auto"
      />
    </Link>
  );
}