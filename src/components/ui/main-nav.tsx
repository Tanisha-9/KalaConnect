"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/types";
import {
  Compass,
  Bell,
  User,
  Brush,
  Megaphone,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const artisanNavItems = [
  { href: "/my-crafts", label: "My Crafts", icon: Brush },
  { href: "/social", label: "Social Post", icon: Megaphone },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

const buyerNavItems = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export function MainNav({
  role,
}: {
  role: UserRole;
}) {
  const pathname = usePathname();
  const navItems = role === "artisan" ? artisanNavItems : buyerNavItems;

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    pathname.startsWith(item.href) && "text-primary"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
