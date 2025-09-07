import { dev } from '@genkit-ai/googleai';

// This is a development-only file and is not used in production.
// It is used to run the Genkit development server.
//
// To run: `genkit start -- tsx src/ai/dev.ts`

dev({
  // You can specify a port to run on, otherwise it will use 4000.
  // port: 3400
});
