import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { mockCrafts, getArtisanForCraft, mockUsers } from "@/lib/data";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MessageArtistDialog } from "@/components/message-artist-dialog";
import { Badge } from "@/components/ui/badge";

export default function ExplorePage() {
  const buyer = mockUsers.find(u => u.role === 'buyer');
  
  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="font-headline text-4xl text-primary">Explore Crafts</h1>
          <p className="text-muted-foreground mt-2">
            Discover unique handmade treasures from artisans around the world.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCrafts.map((craft) => {
            const artisan = getArtisanForCraft(craft);
            if (!artisan) return null;
            return (
              <Card key={craft.id} className="overflow-hidden flex flex-col">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={artisan.avatarUrl} alt={artisan.name} />
                      <AvatarFallback>
                        {artisan.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{artisan.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {artisan.artField} from {artisan.region}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <div className="relative aspect-video">
                    <Image
                      src={craft.imageUrl}
                      alt={craft.title}
                      fill
                      className="object-cover"
                      data-ai-hint="handmade craft"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h2 className="font-headline text-xl">{craft.title}</h2>
                    <p className="text-muted-foreground text-sm">
                      {craft.description}
                    </p>
                    <div className="flex gap-2 pt-2">
                        <Badge variant="secondary">Handmade</Badge>
                        <Badge variant="secondary">{artisan.artField}</Badge>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="p-2">
                  <div className="w-full flex justify-around">
                     <Button variant="ghost" className="w-full">
                       <ThumbsUp className="mr-2 h-4 w-4" /> Like
                     </Button>
                     {buyer && <MessageArtistDialog artisan={artisan} buyer={buyer} />}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
    </AppLayout>
  );
}
