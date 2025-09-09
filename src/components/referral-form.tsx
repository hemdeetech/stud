
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  altPhoneNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  altEmail: z.string().email("Please enter a valid email address.").optional(),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  city: z.string().min(2, "City is required."),
  accountNumber: z.string().min(10, "Please enter a valid account number."),
  accountName: z.string().min(2, "Account name is required."),
  bankName: z.string().min(2, "Bank name is required."),
});

export function ReferralForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      altPhoneNumber: "",
      email: "",
      altEmail: "",
      country: "",
      state: "",
      city: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setIsSuccess(false);
    setSubmissionError(null);
    try {
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong during registration.');
      }

      toast({
        title: "Registration Successful!",
        description: result.message || "Thank you for joining our referral program. We will be in touch.",
      });
      form.reset();
      setIsSuccess(true);

    } catch (error: any) {
       setSubmissionError(error.message || "An unexpected error occurred. Please try again later.");
       toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {submissionError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Registration Failed</AlertTitle>
            <AlertDescription>{submissionError}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+234 801 234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="altPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternative Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+234 801 234 5679" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="altEmail"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Alternative Email (Optional)</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Nigeria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Lagos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Ikeja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div className="space-y-2 pt-4 border-t">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <Alert variant="default" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">Important</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Please ensure your account details are correct. Payments will be sent to this account. HDTC is not responsible for payments sent to an incorrect account due to user error.
            </AlertDescription>
          </Alert>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                        <Input placeholder="GTBank" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                        <Input placeholder="0123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting || isSuccess}>
          {isSubmitting ? "Submitting..." : (isSuccess ? "Submitted!" : "Submit Registration")}
        </Button>
      </form>
    </Form>
  );
}
