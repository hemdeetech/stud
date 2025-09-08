
'use client';
import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { MainCanvas } from '@/components/canvas/main-canvas';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const metadataConfig = {
  title: 'HDTC',
  description: 'Hem Dee Tech Company for electrical installations, smart homes, and more.',
  icons: {
    icon: 'https://res.cloudinary.com/dthpjsy6f/image/upload/v1756738632/hdtc-logo_dtxhkq.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [loading, setLoading] = useState(isHomePage);

  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => setLoading(false), 3000); // Simulate loading time
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [isHomePage]);

  useEffect(() => {
    document.title = metadataConfig.title;
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = metadataConfig.icons.icon;
    }
  }, []);

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn("font-body antialiased", inter.variable)}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            {isHomePage && loading && <LoadingScreen />}
            <div className={cn("relative z-10", { 'hidden': isHomePage && loading })}>
              <Header />
              <main className="min-h-[calc(100vh-10rem)]">{children}</main>
              <Footer />
              <WhatsAppButton />
            </div>
            {isHomePage && <MainCanvas />}
            <Toaster />
            <ProgressBar
              height="4px"
              color="hsl(var(--primary))"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </ThemeProvider>
      </body>
    </html>
  );
}

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold">Loading 3D Experience...</p>
    </div>
  </div>
);
