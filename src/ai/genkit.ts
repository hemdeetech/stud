
'use server';

import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

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
    process.env.GEMINI_API_KEY ? googleAI() : MockPlugin(),
  ],
  enableTracingAndMetrics: true,
});
