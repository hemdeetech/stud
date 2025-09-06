"use client";

import Link from 'next/link';
import { Facebook, Instagram, Phone, Youtube } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

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


export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An unknown error occurred.');
      }

      toast({
        title: 'Success!',
        description: result.message || "You've been added to our newsletter.",
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest news, updates, and special offers delivered directly to your inbox.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={handleSubmit}>
              <Input 
                type="email" 
                placeholder="Email" 
                className="bg-background" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:col-span-2">
              <div className="md:justify-self-center">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                  <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
                  <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
                  <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
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
                        <a href="https://x.com/WeAreHdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><XIcon className="h-5 w-5" /></a>
                        <a href="https://www.tiktok.com/@wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-5 w-5" /></a>
                        <a href="https://youtube.com/@wearehdtc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></a>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-0">
              <Image src="https://res.cloudinary.com/dthpjsy6f/image/upload/v1756738632/hdtc-logo_dtxhkq.png" alt="HDTC Logo" width={32} height={32} className="rounded-full" />
              <span className="font-bold text-lg text-foreground">HDTC</span>
            </Link>
          <p>&copy; {new Date().getFullYear()} HDTC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
