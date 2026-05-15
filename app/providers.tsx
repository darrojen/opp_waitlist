"use client";

import { ThemeProvider } from "next-themes";
import NavigationLoader from "@/components/NavigationLoader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NavigationLoader />
      {children}
    </ThemeProvider>
  );
}
