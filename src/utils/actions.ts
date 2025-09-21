"use server";

import { generateCraftDescription } from "@/ai/flows/craft-description-assistance";
import { enhanceCraftDescription } from "@/ai/flows/craft-description-enhancement";
import { generateHashtags } from "@/ai/flows/ai-generated-hashtags";

export async function generateDescriptionAction(formData: FormData) {
  const interests = formData.get("interests") as string;
  const typeOfWork = formData.get("typeOfWork") as string;
  const additionalDetails = formData.get("additionalDetails") as string;

  const result = await generateCraftDescription({
    interests,
    typeOfWork,
    additionalDetails,
  });

  return result.description;
}

export async function enhanceDescriptionAction(description: string) {
    if (!description) return "";
    const result = await enhanceCraftDescription({ description });
    return result.enhancedDescription;
}

export async function generateHashtagsAction(craftDescription: string) {
    if (!craftDescription) return [];
    const result = await generateHashtags({ craftDescription });
    return result.hashtags;
}
