import { AppLayout } from "@/components/app-layout";
import { mockUsers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
    // In a real app, this would be the logged-in user
    const user = mockUsers[0];

    return (
        <AppLayout>
            <main className="p-4 md:p-8">
                 <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-headline text-4xl text-primary">My Profile</h1>
                        <p className="text-muted-foreground mt-2">
                            Your personal space in the KalaConnect community.
                        </p>
                    </div>
                     <Button asChild>
                        <Link href="/profile/edit">
                            <Pencil className="mr-2 h-4 w-4"/>
                            Edit Profile
                        </Link>
                    </Button>
                </header>
                
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <Avatar className="h-32 w-32 mb-4 border-4 border-accent">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h2 className="font-headline text-2xl">{user.name}</h2>
                                <p className="text-muted-foreground">{user.email}</p>
                                <Badge className="mt-4 capitalize">{user.role}</Badge>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-headline">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                               {user.role === 'artisan' && user.journey && (
                                     <div>
                                        <h3 className="font-semibold text-lg font-headline">My Journey</h3>
                                        <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{user.journey}</p>
                                    </div>
                               )}
                               {user.role === 'artisan' && (
                                   <div className="grid grid-cols-2 gap-4 text-sm">
                                       <div><span className="font-semibold text-muted-foreground">Art Field:</span> {user.artField}</div>
                                       <div><span className="font-semibold text-muted-foreground">Region:</span> {user.region}</div>
                                       <div><span className="font-semibold text-muted-foreground">Age:</span> {user.age}</div>
                                   </div>
                               )}
                               {user.role === 'buyer' && user.interests && (
                                   <div>
                                       <h3 className="font-semibold text-lg font-headline">My Interests</h3>
                                       <div className="flex flex-wrap gap-2 mt-2">
                                            {user.interests.split(',').map(interest => (
                                                <Badge key={interest} variant="secondary">{interest.trim()}</Badge>
                                            ))}
                                       </div>
                                   </div>
                               )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
}
