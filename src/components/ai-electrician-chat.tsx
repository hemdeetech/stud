
'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { chatWithElectrician } from '@/ai/flows/electrician-flow';
import { Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIElectricianChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm Sparky, your AI Electrician. How can I help you with your electrical problem today? For your safety, if you are not comfortable with any of these steps, or if you suspect a serious electrical issue, please do not proceed. Contact a qualified electrician immediately. You can book a service with us at HDTC Solutions.",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack, but this ensures we scroll to the bottom after the DOM has been updated.
        setTimeout(() => {
             if (scrollAreaRef.current) {
                const innerDiv = scrollAreaRef.current.querySelector('div');
                if (innerDiv) {
                    innerDiv.scrollTop = innerDiv.scrollHeight;
                }
             }
        }, 100);
    }
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const assistantResponse = await chatWithElectrician(currentInput);
      const assistantMessage: Message = { role: 'assistant', content: assistantResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar>
            <AvatarFallback><Bot /></AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-3xl font-bold font-headline">AI Electrician Assistant</CardTitle>
        <CardDescription className="text-muted-foreground md:text-lg">
          Ask "Sparky" about your electrical faults. For your safety, if you are not comfortable with any of these steps, or if you suspect a serious electrical issue, please do not proceed. Contact a qualified electrician immediately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 p-4 border rounded-md bg-secondary/20" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                <div className="rounded-lg p-3 bg-background">
                  <p className="text-sm">Sparky is thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your electrical issue..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
