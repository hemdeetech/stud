"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/referral-program", label: "Referral Program" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 sticky top-0 z-50 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="https://res.cloudinary.com/dthpjsy6f/image/upload/v1756738632/hdtc-logo_dtxhkq.png" alt="HDTC Logo" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl text-foreground">HDTC</span>
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
                <SheetHeader className="flex-row justify-between items-center p-4 border-b">
                   <SheetTitle>
                     <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image src="https://res.cloudinary.com/dthpjsy6f/image/upload/v1756738632/hdtc-logo_dtxhkq.png" alt="HDTC Logo" width={32} height={32} className="rounded-full" />
                      <span>HDTC</span>
                    </Link>
                   </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-4 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
