"use client";

import { AppLayout } from "@/components/app-layout";
import { useAuth } from "@/components/auth-provider";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const artisanSchema = z.object({
  name: z.string().min(2, "Name is too short."),
  age: z.coerce.number().min(16, "You must be at least 16.").optional(),
  region: z.string().optional(),
  artField: z.string().optional(),
  journey: z.string().optional(),
});

const buyerSchema = z.object({
  name: z.string().min(2, "Name is too short."),
  interests: z.string().optional(),
});

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const isArtisan = user?.role === "artisan";
  const formSchema = isArtisan ? artisanSchema : buyerSchema;
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      ...(isArtisan && {
          age: user?.age || undefined,
          region: user?.region || "",
          artField: user?.artField || "",
          journey: user?.journey || "",
      }),
      ...(!isArtisan && {
          interests: user?.interests || "",
      })
    },
  });

  function onSubmit(values: any) {
    console.log(values);
    toast({
      title: "Profile Updated!",
      description: "Your changes have been saved successfully.",
    });
    router.push("/profile");
  }

  if (!user) return null;

  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="font-headline text-4xl text-primary">Edit Profile</h1>
            <p className="text-muted-foreground mt-2">
              Keep your information up to date.
            </p>
          </header>
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isArtisan ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="34" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <FormControl>
                                <Input placeholder="Partan,Gujarat" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="artField"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field of Art</FormLabel>
                            <FormControl>
                              <Input placeholder="Handloom Saree, Pottery, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="journey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Journey</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-[120px]" placeholder="Tell us your story..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : (
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interests</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., minimalist design, home decor" {...field} />
                          </FormControl>
                           <FormDescription>
                                Separate interests with a comma.
                            </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="font-headline">Save Changes</Button>
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
