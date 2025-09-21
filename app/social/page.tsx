"use client";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { mockCrafts } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { generateHashtagsAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader, Send, Sparkles, TrendingUp } from "lucide-react";

const postingTimes = [
    { label: "Weekday Mornings (9-11 AM)", value: "weekday_morning" },
    { label: "Weekday Lunch (12-2 PM)", value: "weekday_lunch" },
    { label: "Weekday Evenings (7-9 PM)", value: "weekday_evening", best: true },
    { label: "Weekend Afternoons (1-4 PM)", value: "weekend_afternoon" },
];

export default function SocialPage() {
  const [selectedCraftId, setSelectedCraftId] = React.useState<string | null>(
    null
  );
  const [hashtags, setHashtags] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { toast } = useToast();

  const selectedCraft = mockCrafts.find((c) => c.id === selectedCraftId);

  const handleGenerateHashtags = async () => {
    if (!selectedCraft) return;
    setIsGenerating(true);
    try {
        const result = await generateHashtagsAction(selectedCraft.description);
        setHashtags(result);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not generate hashtags."
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const handlePost = () => {
    toast({
        title: "Post Successful!",
        description: `Your craft "${selectedCraft?.title}" has been posted to the MadeByHand social feed.`
    })
  }

  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="font-headline text-4xl text-primary">Create Social Post</h1>
          <p className="text-muted-foreground mt-2">
            Share your work with the community and beyond.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Post Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="text-sm font-medium">Select a Craft to Post</label>
                  <Select onValueChange={setSelectedCraftId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose one of your creations..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCrafts.map((craft) => (
                        <SelectItem key={craft.id} value={craft.id}>
                          {craft.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCraft && (
                  <div className="mt-6 border rounded-lg p-4 space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <Image src={selectedCraft.imageUrl} alt={selectedCraft.title} fill className="object-cover" />
                    </div>
                    <h3 className="font-headline text-xl">{selectedCraft.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCraft.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {hashtags.length > 0 ? (
                            hashtags.map(tag => <Badge key={tag}>#{tag}</Badge>)
                        ) : (
                            <p className="text-sm text-muted-foreground">Click "Generate Hashtags" to add tags to your post.</p>
                        )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><Sparkles className="text-accent"/> AI Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Generate relevant hashtags to increase your post's visibility.</p>
                    <Button onClick={handleGenerateHashtags} disabled={!selectedCraft || isGenerating} className="w-full">
                        {isGenerating && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
                        {isGenerating ? "Generating..." : "Generate Hashtags"}
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><TrendingUp className="text-accent"/> Optimal Post Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Post at the right time to maximize engagement.</p>
                     <Select defaultValue="weekday_evening">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot"/>
                        </SelectTrigger>
                        <SelectContent>
                            {postingTimes.map(time => (
                                <SelectItem key={time.value} value={time.value}>
                                    {time.label} {time.best && "(Recommended)"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            <Button size="lg" className="w-full font-headline" onClick={handlePost} disabled={!selectedCraft}>
                <Send className="mr-2 h-4 w-4"/>
                Post to Feed
            </Button>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
