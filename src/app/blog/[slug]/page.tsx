
'use client';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch post data based on the slug
  const post = {
    slug: params.slug,
    title: '5 Benefits of Smart Home Automation You Can\'t Ignore',
    images: [
      'https://dl.dropboxusercontent.com/scl/fi/b84rv14egjjfo4f354rpe/images-7.jpeg?rlkey=ugmcbm8o82ysy2e7ht6pxd16q&dl=1',
      'https://dl.dropboxusercontent.com/scl/fi/wee6rmkiuqclpnbk1zug2/images-8.jpeg?rlkey=v06fm6h2w4bhqy84avvmho528&dl=1',
      'https://dl.dropboxusercontent.com/scl/fi/fychzxrnq2jt4he7diiyi/images-6.jpeg?rlkey=lyja0vbbo81uq2lug49wynqzv&dl=1'
    ],
    date: 'October 26, 2023',
    category: 'Innovation',
    aiHint: 'smart home living room'
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-primary font-medium mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <article>
            <Badge variant="outline" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline mb-4">{post.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{post.date}</p>
            
            <Carousel className="w-full mb-8"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${post.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={post.aiHint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
            </Carousel>

            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <p>The world of home technology is rapidly evolving, and smart home automation is at the forefront of this revolution. What was once a concept from science fiction is now an accessible reality for many homeowners. But what exactly are the benefits of turning your house into a smart home? In this post, we'll explore five key advantages that you simply can't ignore.</p>

              <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">1. Enhanced Convenience and Comfort</h2>
              <p>Imagine waking up to your favorite music, the blinds automatically opening to let in the morning light, and the coffee maker already brewing your first cup. This is the level of convenience smart home automation offers. With a centralized system, you can control lighting, temperature, entertainment systems, and more with a simple voice command or a tap on your smartphone. It's about creating an environment that adapts to your needs and preferences, making your daily life more comfortable and effortless.</p>
              
              <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">2. Improved Home Security</h2>
              <p>Smart security systems provide a level of protection that traditional systems can't match. Smart locks, door/window sensors, and high-definition security cameras like the ones we install at HDTC, can all be integrated and monitored remotely. You can receive real-time alerts on your phone, view live camera feeds from anywhere in the world, and even grant temporary access to visitors without needing a physical key. This constant vigilance gives you unparalleled peace of mind.</p>

              <p className="pt-6 border-t">Ready to upgrade your home? <Link href="/contact" className="text-primary font-semibold hover:underline">Contact HDTC today</Link> for a consultation on our smart home services!</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
