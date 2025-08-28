
'use server';
/**
 * @fileOverview A feedback analysis AI flow.
 *
 * - analyzeFeedback - A function that analyzes user feedback for sentiment and category.
 * - FeedbackAnalysisInput - The input type for the analyzeFeedback function.
 * - FeedbackAnalysisOutput - The return type for the analyzeFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const FeedbackAnalysisInputSchema = z.object({
  user: z.string().describe('The name and email of the user providing feedback.'),
  feedback: z.string().describe('The feedback message from the user.'),
});
export type FeedbackAnalysisInput = z.infer<typeof FeedbackAnalysisInputSchema>;

export const FeedbackAnalysisOutputSchema = z.object({
  sentiment: z.enum(['Positive', 'Negative', 'Neutral']).describe('The sentiment of the feedback.'),
  category: z
    .enum(['Bug Report', 'Feature Request', 'Praise', 'Complaint', 'General Feedback'])
    .describe('The category of the feedback.'),
});
export type FeedbackAnalysisOutput = z.infer<typeof FeedbackAnalysisOutputSchema>;

export async function analyzeFeedback(
  input: FeedbackAnalysisInput
): Promise<FeedbackAnalysisOutput> {
  return feedbackAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feedbackAnalysisPrompt',
  input: { schema: FeedbackAnalysisInputSchema },
  output: { schema: FeedbackAnalysisOutputSchema },
  prompt: `You are a feedback analysis expert. Your task is to analyze the following user feedback and determine its sentiment and category.

User: {{{user}}}
Feedback:
{{{feedback}}}

Analyze the sentiment (Positive, Negative, or Neutral) and categorize the feedback into one of the following: Bug Report, Feature Request, Praise, Complaint, or General Feedback.
Provide the analysis in the specified JSON format.`,
});

const feedbackAnalysisFlow = ai.defineFlow(
  {
    name: 'feedbackAnalysisFlow',
    inputSchema: Feedback.FeedbackAnalysisInputSchema,
    outputSchema: Feedback.FeedbackAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
