import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, ArrowRight, DollarSign, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReferralForm } from '@/components/referral-form';


export default function ReferralProgramPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
           <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <Gift className="h-8 w-8 text-primary" />
            </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">Join Our Referral Program</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Earn generous commissions by referring new clients to HDTC. It's our way of saying thank you for your trust and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Register & Refer</h3>
                  <p className="text-muted-foreground">First, sign up for our referral program using the registration form. Then, tell your friends, family, or colleagues about our services.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold">They Sign Up</h3>
                  <p className="text-muted-foreground">When your referral signs a contract with us for any of our services, make sure they mention your name.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold">You Get Paid!</h3>
                  <p className="text-muted-foreground">Once the project is successfully completed and paid for, you receive a commission of 20% to 30% of the project value.</p>
                </div>
              </div>
            </div>
          </div>
          <Card className="bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                <span>Commission Structure</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">20% Commission</h3>
                <p className="text-muted-foreground">For all standard service projects, including electrical wiring, CCTV installation, and maintenance contracts.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">30% Commission</h3>
                <p className="text-muted-foreground">For large-scale projects like complete solar system installations, smart home integrations, and custom software solutions.</p>
              </div>
              <p className="text-sm text-muted-foreground pt-4 border-t">
                Commissions are calculated based on the net project value. Terms and conditions apply.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold tracking-tight">Ready to Start Earning?</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Click the button below to fill out the registration form. It only takes a minute!
          </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="mt-6">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Referral Program Registration</DialogTitle>
                  <DialogDescription>
                    Fill out your details below to join the program. All fields are required.
                  </DialogDescription>
                </DialogHeader>
                <ReferralForm />
              </DialogContent>
            </Dialog>

             <Dialog>
                <DialogTrigger asChild>
                    <p className="text-xs text-muted-foreground mt-4">
                        By registering, you agree to our <Button variant="link" className="p-0 h-auto text-xs">Terms & Conditions</Button>.
                    </p>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>HDTC Referral Program – Terms & Conditions</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground space-y-4">
                        <p>Welcome to the HDTC Referral Program! By participating in this program, you agree to the following terms and conditions:</p>
                        
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold text-foreground">1. Eligibility</h3>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>The referral program is open to all individuals aged 16 years and above.</li>
                                    <li>Employees, agents, and affiliates of HDTC are also eligible to participate.</li>
                                    <li>Referrers must have an active phone number, email, or WhatsApp account to receive rewards.</li>
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-foreground">2. How It Works</h3>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>Participants (Referrers) share HDTC’s services with others (Referees).</li>
                                    <li>A referral is considered successful when: The referee signs up or books a service through HDTC, and the referee makes full payment for the service.</li>
                                    <li>Referrers will earn 20% or 30% commission depending on the service rendered. The exact commission will be calculated based on the service type.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">3. Reward Payments</h3>
                                 <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>Rewards will be paid via bank transfer or mobile money to the referrer.</li>
                                    <li>Payment will be processed within 48 hours after the referred client’s transaction is completed.</li>
                                    <li>Commissions are calculated based on the net amount received by HDTC (excluding discounts, refunds, or cancellations).</li>
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-foreground">4. Referral Restrictions</h3>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>Self-referrals (using your own contact to claim a reward) are not allowed.</li>
                                    <li>Multiple referrals of the same person will only count once, under the first referrer’s record.</li>
                                    <li>Fraudulent, false, or abusive activities will lead to immediate disqualification from the program.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">5. Privacy & Data</h3>
                                 <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>All referral details submitted are securely saved with HDTC and will only be used for the purpose of managing the referral program.</li>
                                    <li>Your information will not be sold or shared with third parties without your consent.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">6. Program Modifications</h3>
                                 <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>HDTC reserves the right to change, suspend, or terminate the referral program at any time without prior notice.</li>
                                    <li>Any changes will be updated on HDTC’s official communication channels (website, social media, or WhatsApp).</li>
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-foreground">7. Governing Law</h3>
                                <p>The HDTC Referral Program is powered by HDTC.</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold text-foreground">For questions or concerns, please contact:</h3>
                             <ul className="list-none mt-2 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <a href="mailto:hem.dee.technology@gmail.com" className="hover:underline">hem.dee.technology@gmail.com</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <a href="tel:09036683558" className="hover:underline">09036683558</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </div>
  );
}
