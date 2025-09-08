
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { EmblaCarouselType } from 'embla-carousel-react'

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  hint?: string;
}

interface GalleryProps {
  media: MediaItem[];
  children: React.ReactNode;
}

export const Gallery: React.FC<GalleryProps> = ({ media, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<EmblaCarouselType | undefined>();
  const [mainApi, setMainApi] = useState<EmblaCarouselType | undefined>();
  
  // This effect ensures we get the API from the child carousel component
  useEffect(() => {
    if (!children || !React.isValidElement(children) || !children.props.setApi) {
        const carouselElement = document.querySelector('.embla-carousel');
        if (carouselElement) {
            // @ts-ignore
            const emblaApi = carouselElement.__emblaApi;
            if (emblaApi) setMainApi(emblaApi);
        }
    }
  }, [children]);


  const openGallery = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };
  
  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const carouselNode = e.currentTarget.querySelector('.embla-carousel');
    // @ts-ignore
    const emblaApi = carouselNode?.__emblaApi;

    if (emblaApi) {
        const index = emblaApi.selectedScrollSnap();
        openGallery(index);
    } else {
        // Fallback for single item galleries that don't have a carousel
        openGallery(0);
    }
  };

  return (
    <>
      <div onClick={handleChildClick} className="cursor-pointer group relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // This is a bit of a hack to get the embla API instance
            // from the child carousel.
            // @ts-ignore
            return React.cloneElement(child, { ref: (node) => {
                if (node && node.querySelector('.embla-carousel')) {
                    // @ts-ignore
                    const emblaApi = node.querySelector('.embla-carousel').__emblaApi;
                    if(emblaApi) setMainApi(emblaApi);
                }
            } });
          }
          return child;
        })}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-auto max-h-[90vh] p-0 bg-transparent border-0 flex flex-col items-center justify-center">
           <DialogHeader className="sr-only">
            <DialogTitle>Project Media Gallery</DialogTitle>
            <DialogDescription>
              A carousel of images and videos for this project. Use the left and right arrows to navigate.
            </DialogDescription>
          </DialogHeader>
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              startIndex: selectedIndex,
              loop: true,
            }}
          >
            <CarouselContent>
              {media.map((item, index) => (
                <CarouselItem key={index}>
                   <div className="relative w-full h-[80vh] flex items-center justify-center">
                    {item.type === 'image' ? (
                        <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain"
                        data-ai-hint={item.hint}
                        />
                    ) : (
                        <video
                        src={item.src}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {media.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};
