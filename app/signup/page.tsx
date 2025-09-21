"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/components/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Brush, Compass } from "lucide-react";
import { Logo } from "@/components/logo";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  role: z.enum(["artisan", "buyer"], {
    required_error: "You need to select a role.",
  }),
});

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (login(values.email, values.role)) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background/80 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
          <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
          <CardDescription>Join our community of creators and connoisseurs</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>I am an...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="artisan" className="sr-only" id="artisan"/>
                          </FormControl>
                          <Label
                            htmlFor="artisan"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Brush className="mb-3 h-6 w-6" />
                            Artisan
                          </Label>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="buyer" className="sr-only" id="buyer"/>
                          </FormControl>
                          <Label
                            htmlFor="buyer"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Compass className="mb-3 h-6 w-6" />
                            Explorer
                          </Label>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-headline text-lg">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>
            Already have an account?{" "}
            <Button variant="link" asChild className="p-0">
              <Link href="/login">Log In</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
