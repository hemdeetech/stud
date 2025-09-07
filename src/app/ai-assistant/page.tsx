
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Bot, User, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { electricalAssistant } from '@/ai/flows/electrical-assistant';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistantPage() {
  const [problem, setProblem] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: problem };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setProblem('');

    try {
      const assistantResponse = await electricalAssistant(problem);
      const assistantMessage: Message = { role: 'assistant', content: assistantResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError('Sorry, something went wrong. The AI assistant is currently unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Electrical Assistant</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Get instant advice on your electrical problems.
          </p>
        </div>

        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Safety First!</AlertTitle>
          <AlertDescription>
            Working with electricity can be extremely dangerous and can result in injury or death. This AI assistant is for informational purposes only. For any complex or uncertain issues, please{' '}
            <Link href="/contact" className="font-bold hover:underline">
              contact a certified HDTC professional immediately.
            </Link>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Describe Your Electrical Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                     {message.role === 'user' && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-6 h-6 text-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                      </div>
                      <div className="rounded-lg p-4 bg-muted space-y-2 w-full max-w-[80%]">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/5" />
                      </div>
                   </div>
                )}
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="e.g., 'My kitchen lights are flickering' or 'One of my outlets is not working...'"
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !problem.trim()}>
                  {isLoading ? 'Thinking...' : 'Ask AI'}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
