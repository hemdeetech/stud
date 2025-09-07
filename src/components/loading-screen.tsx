
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useLoading } from '@/context/loading-context';

export function LoadingScreen() {
  const { isLoading } = useLoading();
  const [hiding, setHiding] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    if (isLoading) {
      setVisible(true);
      setHiding(false);
    } else {
      setHiding(true);
      // Wait for fade-out animation to complete before removing from DOM
      hideTimeout = setTimeout(() => setVisible(false), 500);
    }

    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isLoading]);

  // Render the component only if it should be visible
  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out',
        hiding ? 'opacity-0' : 'opacity-100'
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
