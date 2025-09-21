'use server';

/**
 * @fileOverview Provides AI assistance for generating craft descriptions for buyers.
 *
 * - generateCraftDescription - A function that generates a craft description.
 * - GenerateCraftDescriptionInput - The input type for the generateCraftDescription function.
 * - GenerateCraftDescriptionOutput - The return type for the generateCraftDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCraftDescriptionInputSchema = z.object({
  interests: z
    .string()
    .describe('The buyer/explorer interests to include in the description.'),
  typeOfWork: z.string().describe('The type of craft work the buyer is looking for.'),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details or preferences the buyer has.'),
});
export type GenerateCraftDescriptionInput = z.infer<
  typeof GenerateCraftDescriptionInputSchema
>;

const GenerateCraftDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated craft description.'),
});
export type GenerateCraftDescriptionOutput = z.infer<
  typeof GenerateCraftDescriptionOutputSchema
>;

export async function generateCraftDescription(
  input: GenerateCraftDescriptionInput
): Promise<GenerateCraftDescriptionOutput> {
  return generateCraftDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCraftDescriptionPrompt',
  input: {schema: GenerateCraftDescriptionInputSchema},
  output: {schema: GenerateCraftDescriptionOutputSchema},
  prompt: `You are an AI assistant helping buyers generate descriptions of the craft work they are looking for. Take into account the buyer's stated interests.

  Interests: {{{interests}}}
  Type of Work: {{{typeOfWork}}}
  Additional Details: {{{additionalDetails}}}

  Please generate a detailed and engaging description of the desired craft work, incorporating the above information. Focus on clarity and appeal to artisans.`,
});

const generateCraftDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCraftDescriptionFlow',
    inputSchema: GenerateCraftDescriptionInputSchema,
    outputSchema: GenerateCraftDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
