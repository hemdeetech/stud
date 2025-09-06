
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What services does HDTC offer?",
    answer: (
      <p>
        HDTC provides a wide range of services including:
        <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>House & office wiring installations</li>
            <li>Electrical maintenance & troubleshooting</li>
            <li>CCTV camera installation</li>
            <li>Inverter & solar system installation</li>
            <li>Smart home integration & custom gadget design</li>
            <li>Online/phone electrical consultations</li>
        </ul>
      </p>
    )
  },
  {
    question: "Do you offer 24/7 services?",
    answer: (
      <p>
        Yes. HDTC is available 24/7 for emergency electrical needs, maintenance, and online consultations.
      </p>
    )
  },
  {
    question: "Can I request a consultation online?",
    answer: (
       <p>
        Absolutely! You can chat or call us directly to explain your electrical problem, and our team will provide solutions or schedule a site inspection.
      </p>
    )
  },
  {
    question: "What makes HDTC different from other electrical service providers?",
    answer: (
       <p>
        We don’t just fix electrical problems – we innovate. From smart home solutions to energy-saving systems, HDTC combines engineering expertise, technology, and customer-first service to deliver exceptional results.
      </p>
    )
  },
  {
    question: "How can I book a service?",
    answer: (
      <div>
        You can book via:
        <ul className="list-none mt-2 space-y-2">
            <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>Call/WhatsApp: <a href="tel:09036683558" className="hover:underline">09036683558</a></span>
            </li>
             <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email: <a href="mailto:hem.dee.technology@gmail.com" className="hover:underline">hem.dee.technology@gmail.com</a></span>
            </li>
        </ul>
        <p className="mt-2">Or simply use the contact form on our website.</p>
      </div>
    )
  },
   {
    question: "Do you provide customized solutions?",
    answer: (
       <p>
        Yes. Whether you need a personalized smart home gadget, motion sensor system, or a unique energy solution, HDTC can design and build it for you.
      </p>
    )
  },
   {
    question: "Do you serve only Lagos?",
    answer: (
       <p>
        No. While HDTC is based in Lagos, we handle projects across Nigeria and worldwide depending on the scope and arrangement.
      </p>
    )
  },
  {
    question: "How do I join your referral program?",
    answer: (
      <div className="space-y-4">
        <p>Our referral program allows you to earn 20%–30% commission when you bring in new customers.</p>
        <Button asChild>
            <Link href="/referral-program">Click here to learn more and register!</Link>
        </Button>
      </div>
    )
  },
  {
    question: "What payment methods do you accept?",
    answer: (
       <p>
        We accept bank transfers, POS payments, and cash. For large projects, structured payment plans can also be arranged.
      </p>
    )
  },
   {
    question: "Can HDTC help me save energy at home or in my office?",
    answer: (
       <p>
        Yes! We specialize in solar power, inverters, and energy-efficient systems that help you cut down electricity bills while enjoying stable power.
      </p>
    )
  },
]


export default function FAQPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Frequently Asked Questions</h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
                Find quick answers to common questions about our services, processes, and company.
            </p>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    </div>
  )
}
