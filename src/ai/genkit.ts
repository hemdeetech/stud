
'use server';

import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextPlugin} from '@genkit-ai/next';

const MockPlugin: Plugin<void> = async () => {
  return {
    name: 'mock-plugin',
    prompts: {
      define: (def) => async (input) => {
        return {
          output: 'This is a mock response.',
        };
      },
    },
  };
};

export const ai = genkit({
  plugins: [
    nextPlugin(),
    process.env.GEMINI_API_KEY ? googleAI({apiKey: process.env.GEMINI_API_KEY}) : MockPlugin(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
