
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { analyzeFeedback, FeedbackAnalysisInput } from '@/ai/flows/feedback-flow';
import { Loader2, MessageSquare, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters.'),
});

type FeedbackFormValues = z.infer<typeof formSchema>;

interface FeedbackResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  category: string;
}

export default function FeedbackPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FeedbackResult | null>(null);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
    },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    setIsLoading(true);
    setAnalysisResult(null);

    const input: FeedbackAnalysisInput = {
      user: `${values.name} (${values.email})`,
      feedback: values.feedback,
    };

    try {
      const result = await analyzeFeedback(input);
      setAnalysisResult(result);
      toast({
        title: 'Feedback Submitted!',
        description: 'Thank you for your valuable feedback.',
      });
      form.reset();
    } catch (error) {
      console.error('Error analyzing feedback:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'We couldn\'t submit your feedback. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sentimentIcons = {
    Positive: <ThumbsUp className="w-5 h-5 text-green-500" />,
    Negative: <ThumbsDown className="w-5 h-5 text-red-500" />,
    Neutral: <Meh className="w-5 h-5 text-yellow-500" />,
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
             <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Share Your Feedback</CardTitle>
            <CardDescription className="text-muted-foreground md:text-lg">
              We value your opinion. Let us know how we can improve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your feedback is important to us..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </Button>
              </form>
            </Form>
             {analysisResult && (
              <Card className="mt-8 bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-lg">Feedback Analysis</CardTitle>
                   <CardDescription>
                    This is how our AI interpreted your feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Sentiment:</span>
                    <div className="flex items-center gap-1">
                      {sentimentIcons[analysisResult.sentiment]}
                       <span>{analysisResult.sentiment}</span>
                    </div>
                  </div>
                   <div className="flex items-center gap-2">
                     <span className="font-semibold">Category:</span>
                    <span>{analysisResult.category}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
