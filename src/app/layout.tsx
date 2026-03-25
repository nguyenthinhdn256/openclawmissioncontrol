import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
