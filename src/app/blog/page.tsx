
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const blogPosts = [
  {
    slug: '5-benefits-of-smart-home-automation',
    title: '5 Benefits of Smart Home Automation You Can\'t Ignore',
    description: 'Discover how smart home technology can enhance your lifestyle, improve security, and save you money on energy bills.',
    image: 'https://dl.dropboxusercontent.com/scl/fi/b84rv14egjjfo4f354rpe/images-7.jpeg?rlkey=ugmcbm8o82ysy2e7ht6pxd16q&dl=1',
    date: new Date(),
    category: 'Innovation',
    aiHint: 'smart home'
  },
  {
    slug: 'is-solar-power-right-for-your-business',
    title: 'Is Solar Power Right for Your Business? A Cost-Benefit Analysis',
    description: 'We break down the costs and benefits of switching your commercial property to solar energy, including ROI and environmental impact.',
    image: 'https://dl.dropboxusercontent.com/scl/fi/j16xbnkr2jktpwxdwl39m/images-9.jpeg?rlkey=pbtq1vg4a959mdg0ftb9owly9&dl=1',
    date: new Date(),
    category: 'Energy',
    aiHint: 'commercial building'
  },
  {
    slug: 'the-latest-in-cctv-technology',
    title: 'The Latest in CCTV Technology: What You Need to Know',
    description: 'From AI-powered analytics to 4K resolution, learn about the advancements in surveillance technology and how they can protect your property.',
    image: 'https://dl.dropboxusercontent.com/scl/fi/8sqpn62q7a0ijgj8i8gmq/images-14.jpeg?rlkey=txz8uuem4gsagyuk5mwycj4gr&dl=1',
    date: new Date(),
    category: 'Security',
    aiHint: 'surveillance camera'
  },
];

export default function BlogPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">HDTC Blog &amp; Updates</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Stay informed with the latest news, innovations, and insights from the world of technology and electrical services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative overflow-hidden h-60">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.aiHint}
                  />
                </div>
              </Link>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                <CardTitle className="text-xl">
                   <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription>{format(post.date, 'MMMM d, yyyy')}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={`/blog/${post.slug}`} className="text-primary font-semibold text-sm flex items-center gap-1">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
