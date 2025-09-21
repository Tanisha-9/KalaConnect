import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockNotifications, mockUsers } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
    // In a real app, this would be the logged-in user's ID
    const userId = mockUsers[0].id;
    const notifications = mockNotifications.filter(n => n.userId === userId);

    return (
        <AppLayout>
            <main className="p-4 md:p-8">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-headline text-4xl text-primary">Notifications</h1>
                        <p className="text-muted-foreground mt-2">
                            Recent activity from your community.
                        </p>
                    </div>
                     <Button variant="outline">Mark all as read</Button>
                </header>

                <Card>
                    <CardContent className="p-0">
                        <div className="space-y-2">
                        {notifications.length > 0 ? (
                           notifications.map((notification, index) => (
                               <div key={notification.id} className={cn("flex items-start gap-4 p-4", !notification.read && "bg-accent/20", index !== notifications.length - 1 && "border-b")}>
                                    <div className={cn("h-2.5 w-2.5 mt-1.5 rounded-full", !notification.read ? "bg-primary" : "bg-transparent")}></div>
                                    <div className="flex-1 grid gap-1">
                                        <p className="font-semibold">{notification.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                               </div>
                           ))
                        ) : (
                            <div className="text-center p-12">
                                <h2 className="text-xl font-semibold">No new notifications</h2>
                                <p className="text-muted-foreground mt-2">
                                    You're all caught up!
                                </p>
                            </div>
                        )}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </AppLayout>
    );
}
