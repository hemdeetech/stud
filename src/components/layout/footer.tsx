
import Link from 'next/link';
import { Facebook, Instagram, Phone, Twitter, Zap, Youtube } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);


export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4 text-foreground">
              <Zap className="h-6 w-6 text-primary" />
              <span>HDTC Solutions</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for modern electrical and tech solutions.
            </p>
          </div>
          
          <div className="md:justify-self-center">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div className="md:justify-self-end">
            <h3 className="font-semibold mb-4">Contact & Socials</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+2349036683558" className="text-muted-foreground hover:text-primary">+2349036683558</a>
              </li>
              <li className="mt-4">
                <div className="flex items-center gap-3">
                    <a href="https://www.facebook.com/share/1YbpmmguxM/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
                    <a href="https://www.instagram.com/wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
                    <a href="https://x.com/WeAreHdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                    <a href="https://www.tiktok.com/@wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-5 w-5" /></a>
                    <a href="https://youtube.com/@wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HDTC Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
