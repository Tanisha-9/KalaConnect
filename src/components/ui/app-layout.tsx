
"use client";

import React from "react";
import { useAuth } from "./auth-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { LanguageSwitcher } from "./language-switcher";
import { UserNav } from "./user-nav";
import { BottomNav } from "./bottom-nav";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-md mx-auto p-4 space-y-4">
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-8 w-3/4" />
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2">
            {isMobile ? (
               <SidebarTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Logo iconClassName="size-6" />
                  </Button>
               </SidebarTrigger>
            ) : (
              <>
                <SidebarTrigger asChild>
                   <Button variant="ghost" size="icon" className="md:hidden">
                    <Logo iconClassName="size-6" />
                   </Button>
                </SidebarTrigger>
                <Logo className="hidden md:flex" />
              </>
            )}
          </div>
          <div className="flex-1" />
          <LanguageSwitcher />
          <UserNav />
        </header>
        <div className="flex flex-1">
          <Sidebar
            className="hidden md:flex md:flex-col"
            collapsible={isMobile ? "offcanvas" : "icon"}
          >
            <SidebarContent>
              <MainNav role={user.role} />
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex-1 pb-16 md:pb-0">
            {children}
          </SidebarInset>
        </div>
        {isMobile && <BottomNav role={user.role} />}
      </div>
    </SidebarProvider>
  );
}
