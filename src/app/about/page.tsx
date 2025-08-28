import Image from "next/image";
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">About HDTC Solutions</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            We are a dynamic team of experts dedicated to providing cutting-edge electrical and technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <Image
              src="https://picsum.photos/800/600"
              alt="Our Team"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
              data-ai-hint="team working"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Who We Are</h2>
            <p className="mt-4 text-muted-foreground">
              High Digital Tech Company (HDTC) was founded with a mission to bridge the gap between traditional electrical services and modern technological advancements. We pride ourselves on our commitment to quality, innovation, and customer satisfaction.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our team is composed of certified electricians, IT professionals, and engineers who work collaboratively to deliver comprehensive solutions tailored to each client's unique needs. We believe in continuous learning and stay updated with the latest industry trends to offer the best services possible.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-center">Our Expertise</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            We offer a wide spectrum of services, ensuring that we are your one-stop-shop for all things tech and electrical.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Electrical Installation &amp; Maintenance</h3>
                <p className="text-sm text-muted-foreground">Safe and compliant installations for homes and businesses.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Solar Systems &amp; Inverters</h3>
                <p className="text-sm text-muted-foreground">Sustainable energy solutions to power your life.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">CCTV Installation</h3>
                <p className="text-sm text-muted-foreground">Advanced security systems for your peace of mind.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Smart Home Gadgets</h3>
                <p className="text-sm text-muted-foreground">Automate and control your home with cutting-edge tech.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Computer Science Solutions</h3>
                <p className="text-sm text-muted-foreground">Custom software and hardware to solve complex problems.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">24/7 Services</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock support to keep you up and running.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
