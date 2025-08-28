import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Wrench, Zap } from 'lucide-react';

const featuredServices = [
  { name: 'House & Office Wiring', icon: Zap, href: '/services' },
  { name: 'CCTV Installation', icon: ShieldCheck, href: '/services' },
  { name: 'Solar & Inverter Systems', icon: Zap, href: '/services' },
  { name: 'Smart Home Gadgets', icon: Wrench, href: '/services' },
];

export default function Home() {
  return (
    <>
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Powering Your Future with <span className="text-primary">High Digital Tech</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              From advanced electrical installations to smart home solutions, we provide reliable, innovative, and efficient services to meet all your technological needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/services">Explore Our Services</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Why Choose Us?</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Trusted Tech Partner</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are committed to delivering excellence, safety, and innovation in every project we undertake.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <div className="grid gap-1 text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold">Expertise</h3>
              <p className="text-sm text-muted-foreground">Our team consists of highly skilled professionals with years of experience in the industry.</p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold">Quality &amp; Safety</h3>
              <p className="text-sm text-muted-foreground">We use top-quality materials and adhere to the strictest safety standards.</p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Our services are available around the clock to ensure your systems are always running.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services-preview" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">Our Core Services</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4">
            We offer a wide range of services to cater to your residential and commercial needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featuredServices.map((service) => (
              <Card key={service.name} className="text-center hover:shadow-lg transition-shadow duration-300">
                <Link href={service.href}>
                  <CardHeader>
                    <div className="flex justify-center items-center mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle>{service.name}</CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
             <Button asChild>
               <Link href="/services">View All Services</Link>
             </Button>
           </div>
        </div>
      </section>

      <section id="testimonial" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8">
               <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Testimonials</div>
            </div>
            <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
              “HDTC Solutions transformed our office with their smart home gadgets and professional wiring. The team was efficient, knowledgeable, and the 24/7 support gives us peace of mind. Highly recommended!“
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold">Jane Doe</p>
              <p className="text-sm text-muted-foreground">Office Manager, TechCorp</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
