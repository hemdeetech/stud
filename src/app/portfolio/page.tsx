
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Gallery } from '@/components/gallery';
import { projects } from '@/lib/portfolio-data';

export default function PortfolioPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Our Portfolio</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            A glimpse into the quality and diversity of the projects we have successfully delivered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden flex flex-col">
              <Gallery media={project.media}>
                {project.media.length > 1 ? (
                  <Carousel opts={{ loop: true }} className="w-full group">
                    <CarouselContent>
                      {project.media.map((item, index) => (
                        <CarouselItem key={index}>
                          <div className="relative h-60 w-full overflow-hidden cursor-pointer">
                            {item.type === 'image' ? (
                              <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover"
                                data-ai-hint={item.hint}
                              />
                            ) : (
                              <video
                                src={item.src}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                                onMouseOver={e => (e.target as HTMLVideoElement).play()}
                                onMouseOut={e => (e.target as HTMLVideoElement).pause()}
                              />
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden group-hover:flex" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:flex" />
                  </Carousel>
                ) : (
                  <div className="relative overflow-hidden h-60 cursor-pointer">
                    {project.media[0].type === 'image' ? (
                      <Image
                        src={project.media[0].src}
                        alt={project.media[0].alt}
                        fill
                        className="object-cover w-full"
                        data-ai-hint={project.media[0].hint}
                      />
                    ) : (
                      <video
                        src={project.media[0].src}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    )}
                  </div>
                )}
              </Gallery>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="text-primary font-medium">{project.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
