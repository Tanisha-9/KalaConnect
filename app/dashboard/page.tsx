"use client";

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "artisan") {
        router.replace("/my-crafts");
      } else {
        router.replace("/explore");
      }
    }
  }, [user, loading, router]);

  return (
     <div className="flex h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
            <Skeleton className="h-10 w-48 mx-auto" />
            <p className="text-muted-foreground">Redirecting to your dashboard...</p>
        </div>
    </div>
  );
}
