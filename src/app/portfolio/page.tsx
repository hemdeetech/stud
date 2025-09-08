
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

const projects = [
  {
    title: 'Transformation from Ordinary to Stunning',
    description: 'The job took place at Iyana Ipaja. The transformation included hanging of a TV, change of POP LED light, wiring, and sockets installation.',
    media: [
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/bl8352tfn57ybaggb53kq/IMG_20250905_142013_136.jpg?rlkey=px30c7pln22p1kqpfaxbiy1s6&dl=1', alt: 'Living room before transformation', hint: 'living room renovation' },
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/1bqtq3n2pw0d5gkd3jg3q/IMG_20250905_142306_829.jpg?rlkey=s84irlcvyeo9yxy7xjm0k8vcg&dl=1', alt: 'New TV setup', hint: 'living room renovation' },
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/ivmczd77779gho8go0lx3/IMG_20250905_142334_856.jpg?rlkey=0emx06bs9pxy3oqvn0p3999go&dl=1', alt: 'POP LED light installation', hint: 'living room renovation' },
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/xbm0rgez7cte52dnevhqk/IMG_20250905_143335_668.jpg?rlkey=zbk8bg7z5ol23u7tkjcnxail5&dl=1', alt: 'Wiring and socket details', hint: 'living room renovation' },
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/m91gijbjxbpo77qxajnph/IMG_20250905_143346_780.jpg?rlkey=088gh745rym8zc6q6fw2e8jdg&dl=1', alt: 'Finished living room view', hint: 'living room renovation' },
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/zlohkvasv2i4rzoxwz68d/IMG_20250905_143406_115.jpg?rlkey=iwld0x86bxnguqf0iqe1b43ao&dl=1', alt: 'Ambient lighting effect', hint: 'living room renovation' },
      { type: 'image', src: 'https://www.dropbox.com/scl/fi/yfftzha3nc3n0foi79t7r/IMG_20250905_143413_613.jpg?rlkey=k6xahs1truq4y9p1ivsqgx094&dl=1', alt: 'Wide shot of the transformed room', hint: 'living room renovation' },
      { type: 'video', src: 'https://www.dropbox.com/scl/fi/pivvpj3ejnzu8mi9hjrap/InShot_20250908_075247015.mp4?rlkey=a2y157kzymzamdcm4pn5ue6mr&dl=1', alt: 'Video tour of the transformation', hint: 'living room renovation' },
    ],
    category: 'Residential Renovation',
  },
  {
    title: 'Smart Office Renovation',
    description: 'Complete overhaul of a corporate office with smart lighting, automated blinds, and integrated conference room technology.',
    media: [{ type: 'image', src: 'https://picsum.photos/600/400?random=1', alt: 'Smart Office', hint: 'smart office' }],
    category: 'Smart Home',
  },
  {
    title: 'Residential Solar Panel Installation',
    description: 'Installed a 10kW rooftop solar system for a family home, reducing their energy bills by 80%.',
    media: [{ type: 'image', src: 'https://picsum.photos/600/400?random=2', alt: 'Solar Panels', hint: 'solar panels' }],
    category: 'Solar Systems',
  },
  {
    title: 'Retail Store CCTV Network',
    description: 'Deployed a network of 32 high-definition CCTV cameras for a large retail store, including a central monitoring station.',
    media: [{ type: 'image', src: 'https://picsum.photos/600/400?random=3', alt: 'Security Cameras', hint: 'security cameras' }],
    category: 'CCTV',
  },
  {
    title: 'New Home Electrical Wiring',
    description: 'Full electrical wiring for a newly constructed luxury home, from foundational wiring to final fixture installation.',
    media: [{ type: 'image', src: 'https://picsum.photos/600/400?random=4', alt: 'Electrical Wiring', hint: 'electrical wiring' }],
    category: 'Electrical Wiring',
  },
  {
    title: 'Custom Inventory Management Software',
    description: 'Developed a bespoke inventory management application for a warehouse, integrating barcode scanners and real-time tracking.',
    media: [{ type: 'image', src: 'https://picsum.photos/600/400?random=5', alt: 'Warehouse Software', hint: 'warehouse software' }],
    category: 'Software Solutions',
  },
  {
    title: 'Inverter Backup for Small Business',
    description: 'Set up a reliable inverter and battery backup system to ensure uninterrupted power for a critical small business.',
    media: [{ type: 'image', src: 'https://picsum.photos/600/400?random=6', alt: 'Server Room', hint: 'server room' }],
    category: 'Inverter Systems',
  },
];

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

    