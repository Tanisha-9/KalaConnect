"use client";

import { UserRole } from "@/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Compass, Bell, User, Brush, Megaphone } from "lucide-react";

const artisanNavItems = [
  { href: "/my-crafts", label: "Crafts", icon: Brush },
  { href: "/social", label: "Post", icon: Megaphone },
  { href: "/notifications", label: "Inbox", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

const buyerNavItems = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/notifications", label: "Inbox", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const navItems = role === "artisan" ? artisanNavItems : buyerNavItems;
  const gridColsClass = navItems.length === 4 ? "grid-cols-4" : "grid-cols-3";

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className={cn("grid h-full mx-auto font-medium", gridColsClass)}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-accent group"
            >
              <Icon
                className={cn(
                  "w-6 h-6 mb-1 text-muted-foreground group-hover:text-accent-foreground",
                  isActive && "text-primary"
                )}
              />
              <span
                className={cn(
                  "text-xs text-muted-foreground group-hover:text-accent-foreground",
                  isActive && "text-primary font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
