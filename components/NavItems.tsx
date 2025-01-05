"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Button } from "./ui/button";
import { RoutePaths } from "@/lib/constants";

export const NavItems = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex flex-row gap-2">
      <Link href={RoutePaths.OVERVIEW}>
        <Button
          className={clsx({ "bg-accent": pathname === "/overview" })}
          size="xl"
          variant={"ghost"}
        >
          Home
        </Button>
      </Link>
      <Link href={RoutePaths.SAVED}>
        <Button
          className={clsx({ "bg-accent": pathname === "/saved" })}
          variant={"ghost"}
        >
          Saved Recipes
        </Button>
      </Link>
      <Link href={RoutePaths.BILLING}>
        <Button
          className={clsx({ "bg-accent": pathname === "/subscriptions" })}
          variant={"ghost"}
        >
          My Plan
        </Button>
      </Link>
    </div>
  );
};
