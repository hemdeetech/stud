
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { EmblaCarouselType } from 'embla-carousel-react'

interface GalleryProps {
  images: {
    src: string;
    alt: string;
    hint?: string;
  }[];
  children: React.ReactNode;
}

export const Gallery: React.FC<GalleryProps> = ({ images, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<EmblaCarouselType | undefined>();
  const [mainApi, setMainApi] = useState<EmblaCarouselType | undefined>();

  const openGallery = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };
  
  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const carouselItem = (e.target as HTMLElement).closest('.embla__slide');
    if (carouselItem && mainApi) {
        const index = mainApi.selectedScrollSnap();
        openGallery(index);
    }
  };


  return (
    <>
      <div onClick={handleChildClick} className="cursor-pointer group relative" ref={(node) => node && setMainApi(node.querySelector('.embla-carousel')?.__emblaApi)}>
        {children}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-0 flex flex-col items-center justify-center">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              startIndex: selectedIndex,
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                   <div className="relative w-full h-[80vh] flex items-center justify-center">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      data-ai-hint={image.hint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};
