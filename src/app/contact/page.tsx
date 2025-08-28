import { ContactForm } from '@/components/contact-form';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Contact Us</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            We'd love to hear from you. Reach out with any questions or to start your next project with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
          <div className="bg-secondary/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone Number</h3>
                  <a href="tel:09036683558" className="text-muted-foreground hover:text-primary">09036683558</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Address</h3>
                  <a href="mailto:contact@hdtcsolutions.com" className="text-muted-foreground hover:text-primary">contact@hdtcsolutions.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Office</h3>
                  <p className="text-muted-foreground">123 Tech Avenue, Innovation City</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <Twitter className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Social Media</h3>
                  <p className="text-muted-foreground mb-2">@WeAreHdtc</p>
                  <div className="flex items-center gap-4">
                    <a href="https://twitter.com/WeAreHdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                    <a href="https://facebook.com/WeAreHdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
                    <a href="https://instagram.com/WeAreHdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
                 </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background p-8 rounded-lg shadow-lg">
             <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
