'use server';
/**
 * @fileOverview An AI electrician assistant flow.
 *
 * - chatWithElectrician - A function that handles the chat with the AI electrician.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithElectricianInputSchema = z.string().optional();
type ChatWithElectricianInput = z.infer<typeof ChatWithElectricianInputSchema>;

const ChatWithElectricianOutputSchema = z.string();
type ChatWithElectricianOutput = z.infer<typeof ChatWithElectricianOutputSchema>;

export async function chatWithElectrician(
  input: ChatWithElectricianInput
): Promise<ChatWithElectricianOutput> {
  return electricianFlow(input);
}

const safetyMessage =
  'For your safety, if you are not comfortable with any of these steps, or if you suspect a serious electrical issue, please do not proceed. Contact a qualified electrician immediately. You can book a service with us at HDTC Solutions.';

const prompt = ai.definePrompt({
  name: 'electricianPrompt',
  input: {schema: z.string()},
  output: {schema: ChatWithElectricianOutputSchema},
  prompt: `You are an expert electrician from HDTC Solutions, a company that provides top-notch electrical services. Your name is "Sparky".
Your role is to assist users by diagnosing their electrical faults.

- Always prioritize safety. Start every conversation by reminding the user: "${safetyMessage}"
- Be friendly, clear, and professional.
- Ask clarifying questions if the user's query is vague.
- Provide step-by-step guidance for simple and common electrical problems.
- If you cannot solve the query, or if the issue seems complex, dangerous, or requires a professional, you MUST advise the user to book a service with HDTC Solutions. Say something like: "For this kind of issue, it's best to have a professional take a look. You can book a service with our expert team at HDTC Solutions to get this resolved safely and efficiently." Then direct them to the contact page.`,
});

const electricianFlow = ai.defineFlow(
  {
    name: 'electricianFlow',
    inputSchema: ChatWithElectricianInputSchema,
    outputSchema: ChatWithElectricianOutputSchema,
  },
  async (input) => {
    if (!input) {
      return `Hi, I'm Sparky! How can I help you with your electrical issues today? ${safetyMessage}`;
    }
    const {output} = await prompt(input);
    return output!;
  }
);
