'use server';
/**
 * @fileOverview This file contains a Genkit flow for enhancing craft descriptions using AI.
 *
 * It takes a craft description as input and returns an enhanced version that is more engaging and appealing.
 *
 * @interface CraftDescriptionEnhancementInput - Defines the input schema for the craft description enhancement flow.
 * @interface CraftDescriptionEnhancementOutput - Defines the output schema for the craft description enhancement flow.
 * @function enhanceCraftDescription - The main function that calls the craft description enhancement flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CraftDescriptionEnhancementInputSchema = z.object({
  description: z
    .string()
    .describe('The original description of the craft that needs enhancement.'),
});
export type CraftDescriptionEnhancementInput = z.infer<
  typeof CraftDescriptionEnhancementInputSchema
>;

const CraftDescriptionEnhancementOutputSchema = z.object({
  enhancedDescription: z
    .string()
    .describe('The enhanced and more engaging description of the craft.'),
});
export type CraftDescriptionEnhancementOutput = z.infer<
  typeof CraftDescriptionEnhancementOutputSchema
>;

export async function enhanceCraftDescription(
  input: CraftDescriptionEnhancementInput
): Promise<CraftDescriptionEnhancementOutput> {
  return craftDescriptionEnhancementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'craftDescriptionEnhancementPrompt',
  input: {schema: CraftDescriptionEnhancementInputSchema},
  output: {schema: CraftDescriptionEnhancementOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in crafting compelling descriptions for handmade crafts.

  Given the following craft description, enhance it to be more engaging and appealing to a wider audience.
  Focus on highlighting the unique aspects, the story behind the craft, and the artisan's passion.

  Original Description: {{{description}}}

  Enhanced Description:`, // Ensure the output is assigned to the 'enhancedDescription' field
});

const craftDescriptionEnhancementFlow = ai.defineFlow(
  {
    name: 'craftDescriptionEnhancementFlow',
    inputSchema: CraftDescriptionEnhancementInputSchema,
    outputSchema: CraftDescriptionEnhancementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
