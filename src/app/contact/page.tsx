
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);


export default function ContactPage() {
  const displayPhoneNumber = "+2349036683558";

  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Contact Us</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            We'd love to hear from you. Reach out with any questions or to start your next project with us.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
                <div className="bg-secondary/50 p-8 rounded-lg flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
                    <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                        <h3 className="font-semibold">Phone Number</h3>
                        <a href={`tel:${displayPhoneNumber}`} className="text-muted-foreground hover:text-primary">{displayPhoneNumber}</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                        <h3 className="font-semibold">Email Address</h3>
                        <a href="mailto:hem.dee.technology@gmail.com" className="text-muted-foreground hover:text-primary">hem.dee.technology@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                        <h3 className="font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">Dopemu, Lagos, Nigeria.</p>
                        </div>
                    </div>
                    <div className="pt-6 border-t">
                        <h3 className="font-semibold mb-2 text-center">Social Media</h3>
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <a href="https://www.facebook.com/share/1YbpmmguxM/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
                            <a href="https://www.instagram.com/wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
                            <a href="https://x.com/WeAreHdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><XIcon className="h-5 w-5" /></a>
                            <a href="https://www.tiktok.com/@wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-5 w-5" /></a>
                            <a href="https://youtube.com/@wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-background p-8 rounded-lg shadow-lg flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
