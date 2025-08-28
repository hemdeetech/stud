import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Code, GanttChartSquare, Lightbulb, Sun, Video, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: 'House & Office Wiring',
    description: 'Professional and safe electrical wiring for new constructions and renovations, ensuring compliance with all safety standards.',
    icon: Zap,
  },
  {
    title: 'CCTV Installation',
    description: 'High-definition security camera systems for residential and commercial properties, offering remote monitoring and peace of mind.',
    icon: Video,
  },
  {
    title: 'Solar & Inverter Systems',
    description: 'Design and installation of custom solar power and backup inverter systems for energy independence and cost savings.',
    icon: Sun,
  },
  {
    title: 'Smart Home Gadgets',
    description: 'Installation and integration of smart devices, including lighting, thermostats, and locks for a futuristic home experience.',
    icon: Bot,
  },
  {
    title: 'Electrical Inspections',
    description: 'Thorough electrical safety inspections and audits for homes and businesses to identify potential hazards and ensure code compliance.',
    icon: GanttChartSquare,
  },
  {
    title: 'Consulting',
    description: 'Expert consultation for electrical and technology projects, providing strategic planning and project management.',
    icon: Lightbulb,
  },
  {
    title: 'Custom Software/Hardware Integration',
    description: 'Bespoke computer science solutions, including software development and hardware integration to meet your unique business needs.',
    icon: Code,
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Our Services</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            We provide a comprehensive range of electrical and technological services designed to meet the evolving needs of our clients.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
