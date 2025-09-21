"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { MessageSquare, Sparkles } from "lucide-react";
import { Craft, User } from "@/lib/types";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDescriptionAction } from "@/lib/actions";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  interests: z.string().min(1, "Please describe your interests."),
  typeOfWork: z.string().min(1, "Please describe the type of work."),
  additionalDetails: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type MessageArtistDialogProps = {
  artisan: User;
  buyer: User;
};

export function MessageArtistDialog({ artisan, buyer }: MessageArtistDialogProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: buyer.interests || "",
      typeOfWork: "",
      additionalDetails: "",
      message: "",
    },
  });

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    const formData = new FormData();
    formData.append("interests", form.getValues("interests"));
    formData.append("typeOfWork", form.getValues("typeOfWork"));
    formData.append("additionalDetails", form.getValues("additionalDetails") || "");
    
    try {
      const description = await generateDescriptionAction(formData);
      form.setValue("message", description);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not generate description.",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
        title: "Message Sent!",
        description: `Your inquiry has been sent to ${artisan.name}.`,
    })
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" /> Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Message {artisan.name}
          </DialogTitle>
          <DialogDescription>
            Describe the custom craft you have in mind.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., minimalist design, nature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeOfWork"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Work</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., custom ceramic dinner set" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
                control={form.control}
                name="additionalDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., specific colors, materials" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <FormLabel htmlFor="message">Your Message</FormLabel>
                    <Button type="button" size="sm" variant="outline" onClick={handleGenerateDescription} disabled={isGenerating}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating..." : "Generate with AI"}
                    </Button>
                </div>
                 <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea id="message" placeholder="Describe what you're looking for..." className="min-h-[120px]" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <DialogFooter>
                <Button type="submit" className="font-headline">Send Message</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
