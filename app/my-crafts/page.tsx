import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockCrafts, mockUsers } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function MyCraftsPage() {
  const artisan = mockUsers.find((u) => u.role === "artisan");
  const crafts = mockCrafts.filter((c) => c.artisanId === artisan?.id);

  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-4xl text-primary">My Crafts</h1>
            <p className="text-muted-foreground mt-2">
              Your personal gallery of handmade creations.
            </p>
          </div>
          <Button asChild>
            <Link href="/my-crafts/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Craft
            </Link>
          </Button>
        </header>

        {crafts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crafts.map((craft) => (
              <Card key={craft.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={craft.imageUrl}
                      alt={craft.title}
                      fill
                      className="object-cover"
                      data-ai-hint="handmade craft"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-headline text-lg">{craft.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {craft.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Added{" "}
                      {formatDistanceToNow(new Date(craft.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">Your gallery is empty</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Start by adding your first masterpiece.
            </p>
            <Button asChild>
              <Link href="/my-crafts/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Craft
              </Link>
            </Button>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
