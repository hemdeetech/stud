
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setHiding(true);
      // Wait for fade-out animation to complete before removing from DOM
      setTimeout(() => setLoading(false), 500);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

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
