
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export function LoadingScreen() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // This effect now tracks page changes to reset the loading screen.
    // However, we only want the *initial* load animation.
    // The key is that this component only runs once on the client-side initial load.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Minimum time the loader is visible

    return () => clearTimeout(timer);
  }, []); // Changed to empty dependency array to ensure it only runs once on initial mount

   useEffect(() => {
    if (!isLoading) {
      // Start the fade-out transition
      const hideTimer = setTimeout(() => setHiding(true), 100);
      return () => clearTimeout(hideTimer);
    }
  }, [isLoading]);
  
  if (isLoading) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out',
          hiding && 'opacity-0 pointer-events-none'
        )}
      >
        <div className="logo-3d-container">
          <Image
            src="https://res.cloudinary.com/dthpjsy6f/image/upload/v1756738632/hdtc-logo_dtxhkq.png"
            alt="HDTC Logo"
            width={100}
            height={100}
            className="rounded-full logo-3d-image"
            unoptimized
          />
        </div>
      </div>
    );
  }

  return null;
}
