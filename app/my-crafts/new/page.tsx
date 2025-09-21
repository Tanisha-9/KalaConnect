"use client";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { enhanceDescriptionAction } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  photo: z.any().optional(),
});

export default function NewCraftPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isEnhancing, setIsEnhancing] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceDescription = async () => {
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceDescriptionAction(form.getValues("description"));
      form.setValue("description", enhanced);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not enhance description."
        })
    } finally {
        setIsEnhancing(false);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Craft Added!",
      description: `"${values.title}" has been added to your gallery.`,
    });
    router.push("/my-crafts");
  }

  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="font-headline text-4xl text-primary">Add a New Craft</h1>
            <p className="text-muted-foreground mt-2">
              Showcase your latest creation to the world.
            </p>
          </header>
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                       <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Craft Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Hand-thrown Ceramic Mug" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel>Description</FormLabel>
                                <Button type="button" size="sm" variant="outline" onClick={handleEnhanceDescription} disabled={isEnhancing}>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                                </Button>
                            </div>
                            <FormControl>
                              <Textarea
                                placeholder="Tell the story of your craft..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                             <FormDescription>
                                Describe the materials, process, and inspiration.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Craft Photo</FormLabel>
                            <FormControl>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/20 relative">
                                        {previewImage ? (
                                            <Image src={previewImage} alt="Preview" fill className="object-cover rounded-lg" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-muted-foreground"/>
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        )}
                                        <Input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*"/>
                                    </label>
                                </div> 
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="font-headline">Add Craft</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppLayout>
  );
}
