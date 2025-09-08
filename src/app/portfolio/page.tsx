
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const projects = [
  {
    title: 'Transformation from Ordinary to Stunning',
    description: 'The job took place at Iyana Ipaja. The transformation included hanging of a TV, change of POP LED light, wiring, and sockets installation.',
    image: 'https://www.dropbox.com/scl/fi/bl8352tfn57ybaggb53kq/IMG_20250905_142013_136.jpg?rlkey=px30c7pln22p1kqpfaxbiy1s6&st=1oduvp4q&dl=1',
    category: 'Residential Renovation',
    aiHint: 'living room renovation'
  },
  {
    title: 'Smart Office Renovation',
    description: 'Complete overhaul of a corporate office with smart lighting, automated blinds, and integrated conference room technology.',
    image: 'https://picsum.photos/600/400?random=1',
    category: 'Smart Home',
    aiHint: 'smart office'
  },
  {
    title: 'Residential Solar Panel Installation',
    description: 'Installed a 10kW rooftop solar system for a family home, reducing their energy bills by 80%.',
    image: 'https://picsum.photos/600/400?random=2',
    category: 'Solar Systems',
    aiHint: 'solar panels'
  },
  {
    title: 'Retail Store CCTV Network',
    description: 'Deployed a network of 32 high-definition CCTV cameras for a large retail store, including a central monitoring station.',
    image: 'https://picsum.photos/600/400?random=3',
    category: 'CCTV',
    aiHint: 'security cameras'
  },
  {
    title: 'New Home Electrical Wiring',
    description: 'Full electrical wiring for a newly constructed luxury home, from foundational wiring to final fixture installation.',
    image: 'https://picsum.photos/600/400?random=4',
    category: 'Electrical Wiring',
    aiHint: 'electrical wiring'
  },
  {
    title: 'Custom Inventory Management Software',
    description: 'Developed a bespoke inventory management application for a warehouse, integrating barcode scanners and real-time tracking.',
    image: 'https://picsum.photos/600/400?random=5',
    category: 'Software Solutions',
    aiHint: 'warehouse software'
  },
  {
    title: 'Inverter Backup for Small Business',
    description: 'Set up a reliable inverter and battery backup system to ensure uninterrupted power for a critical small business.',
    image: 'https://picsum.photos/600/400?random=6',
    category: 'Inverter Systems',
    aiHint: 'server room'
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
            <Card key={project.title} className="overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-60"
                  data-ai-hint={project.aiHint}
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="text-primary font-medium">{project.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
