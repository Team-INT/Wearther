"use client";

import * as React from "react";
import Link from "next/link";

// constants
import {NAVIGATION_CONSTANTS} from "@/lib/constants/navigationConst";

// components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// utils
import {cn} from "@/lib/utils";

export function HeaderNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_CONSTANTS.filter((section) => section.title !== "Social").map((section) => (
          <NavigationMenuItem key={section.title}>
            <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {section.items.map((item) => (
                  <ListItem key={item.label} title={item.label} href={item.href ?? ""}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({className, title, children, href, ...props}, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {href ? (
            <Link
              href={href}
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
            </Link>
          ) : null}
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
