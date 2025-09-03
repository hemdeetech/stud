
'use client';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { notFound } from 'next/navigation';

// In a real app, this data would likely come from a CMS or database
const allPosts = {
  '5-benefits-of-smart-home-automation': {
    slug: '5-benefits-of-smart-home-automation',
    title: "5 Benefits of Smart Home Automation You Can't Ignore",
    images: [
      'https://dl.dropboxusercontent.com/scl/fi/b84rv14egjjfo4f354rpe/images-7.jpeg?rlkey=ugmcbm8o82ysy2e7ht6pxd16q&dl=1',
      'https://dl.dropboxusercontent.com/scl/fi/wee6rmkiuqclpnbk1zug2/images-8.jpeg?rlkey=v06fm6h2w4bhqy84avvmho528&dl=1',
      'https://dl.dropboxusercontent.com/scl/fi/fychzxrnq2jt4he7diiyi/images-6.jpeg?rlkey=lyja0vbbo81uq2lug49wynqzv&dl=1'
    ],
    date: 'October 26, 2023',
    category: 'Innovation',
    aiHint: 'smart home living room',
    content: (
      <>
        <p>The world of home technology is rapidly evolving, and smart home automation is at the forefront of this revolution. What was once a concept from science fiction is now an accessible reality for many homeowners. But what exactly are the benefits of turning your house into a smart home? In this post, we'll explore five key advantages that you simply can't ignore.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">1. Enhanced Convenience and Comfort</h2>
        <p>Imagine waking up to your favorite music, the blinds automatically opening to let in the morning light, and the coffee maker already brewing your first cup. This is the level of convenience smart home automation offers. With a centralized system, you can control lighting, temperature, entertainment systems, and more with a simple voice command or a tap on your smartphone. It's about creating an environment that adapts to your needs and preferences, making your daily life more comfortable and effortless.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">2. Improved Home Security</h2>
        <p>Smart security systems provide a level of protection that traditional systems can't match. Smart locks, door/window sensors, and high-definition security cameras like the ones we install at HDTC, can all be integrated and monitored remotely. You can receive real-time alerts on your phone, view live camera feeds from anywhere in the world, and even grant temporary access to visitors without needing a physical key. This constant vigilance gives you unparalleled peace of mind.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">3. Increased Energy Efficiency</h2>
        <p>Smart thermostats learn your schedule and adjust the temperature accordingly, so you're not wasting energy heating or cooling an empty home. Smart lighting can be programmed to turn off when a room is unoccupied, and smart blinds can close during the hottest part of the day to keep your home cool. These small adjustments can lead to significant savings on your energy bills and a reduced carbon footprint.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">4. Remote Control and Monitoring</h2>
        <p>Ever leave the house and worry you forgot to lock the door or turn off the iron? With a smart home, you can check the status of your devices and control them remotely from your smartphone. This capability is not just for peace of mind; it's also incredibly useful for letting in a trusted neighbor or family member when you're not home.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">5. Insights into Your Home's Usage</h2>
        <p>Many smart devices provide data on your habits. For example, a smart plug can tell you how much energy a particular appliance is consuming. This information allows you to make more informed decisions about your energy usage, helping you identify opportunities to save money and live more sustainably.</p>
      </>
    )
  },
  'is-solar-power-right-for-your-business': {
    slug: 'is-solar-power-right-for-your-business',
    title: 'Is Solar Power Right for Your Business? A Cost-Benefit Analysis',
    images: [
        'https://dl.dropboxusercontent.com/scl/fi/j16xbnkr2jktpwxdwl39m/images-9.jpeg?rlkey=pbtq1vg4a959mdg0ftb9owly9&dl=1',
        'https://dl.dropboxusercontent.com/scl/fi/ca8nrytc9wpwpyhdijc6j/images-10.jpeg?rlkey=wbn99f25wpjukm7jbch2nxcdn&dl=1',
        'https://dl.dropboxusercontent.com/scl/fi/xkcqe3f2529g6r17z5m35/images-11.jpeg?rlkey=zit0wzb073buz8uwu0shn0iqh&dl=1'
    ],
    date: 'October 15, 2023',
    category: 'Energy',
    aiHint: 'commercial building solar',
    content: (
      <>
        <p>For business owners, the bottom line is always a priority. Switching to solar power is a significant investment, but it's one that can offer substantial returns. In this post, we'll conduct a cost-benefit analysis to help you determine if solar energy is the right move for your commercial property.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">The Costs</h2>
        <p>The primary cost of going solar is the initial investment in panels, inverters, and installation. This can vary widely depending on the size of your property and your energy needs. However, government incentives, tax credits, and financing options can significantly offset these upfront costs.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">The Benefits</h2>
        <p>The most obvious benefit is a dramatic reduction in your electricity bills. Additionally, solar power increases your property value, demonstrates corporate responsibility, and protects your business from rising energy costs. With a typical ROI period of 5-10 years and a system lifespan of 25+ years, the long-term financial benefits are compelling.</p>
      </>
    )
  },
  'the-latest-in-cctv-technology': {
    slug: 'the-latest-in-cctv-technology',
    title: 'The Latest in CCTV Technology: What You Need to Know',
    images: ['https://picsum.photos/800/450?random=9'],
    date: 'September 28, 2023',
    category: 'Security',
    aiHint: 'surveillance camera grid',
    content: (
      <>
        <p>Modern surveillance is much more than just a camera recording to a tape. The latest advancements in CCTV technology have transformed it into a proactive security tool. Let's explore some of the key features you should be aware of.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">AI-Powered Analytics</h2>
        <p>Today's cameras can do more than just see; they can understand. AI analytics can distinguish between people, vehicles, and animals, reducing false alarms. They can also detect specific events, like someone loitering in an area for too long or a package being left behind, and send you instant alerts.</p>
        <h2 className="text-3xl font-bold tracking-tight font-headline pt-6 border-t">High Resolution and Low-Light Performance</h2>
        <p>4K resolution is becoming the new standard, providing crystal-clear images that make it easier to identify faces and license plates. Furthermore, advanced sensors and infrared technology mean that modern cameras can capture detailed, full-color footage even in near-total darkness, ensuring your property is protected 24/7.</p>
      </>
    )
  }
};


export default function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = allPosts[slug as keyof typeof allPosts];

  // If the slug doesn't match any post, show a 404 page
  if (!post) {
    notFound();
  }

  const postKeys = Object.keys(allPosts);
  const currentIndex = postKeys.indexOf(post.slug);
  const nextPost = currentIndex < postKeys.length - 1 ? allPosts[postKeys[currentIndex + 1] as keyof typeof allPosts] : null;
  const prevPost = currentIndex > 0 ? allPosts[postKeys[currentIndex - 1] as keyof typeof allPosts] : null;

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
                loop: post.images.length > 1,
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
              {post.images.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </>
              )}
            </Carousel>

            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              {post.content}
              <p className="pt-6 border-t">Ready to upgrade your home or business? <Link href="/contact" className="text-primary font-semibold hover:underline">Contact HDTC today</Link> for a consultation!</p>
            </div>
          </article>

          <div className="mt-16 pt-8 border-t">
            <div className="flex justify-between items-center">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="text-primary font-medium flex items-center gap-2">
                   <ArrowLeft className="h-4 w-4" />
                   <span>Previous Post</span>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="text-primary font-medium flex items-center gap-2">
                   <span>Next Post</span>
                   <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

    