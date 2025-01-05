"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RoutePaths } from "@/lib/constants";
import { cn } from "@/lib/cn";

export const LinkGroup = ({ children, isSubscribed }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col sm:flex-row gap-8 items-center">
      <div className="flex gap-4 text-lg">
        <Link
          className={cn(
            "text-[#bd1e59] hover:text-[#a61a4f] border-b-2 border-transparent hover:border-[#bd1e59]",
            { "border-[#bd1e59]": pathname === RoutePaths.OVERVIEW }
          )}
          href={RoutePaths.OVERVIEW}
        >
          Search
        </Link>
        {isSubscribed && (
          <Link
            className={cn(
              "text-[#bd1e59] hover:text-[#a61a4f] border-b-2 border-transparent hover:border-[#bd1e59]",
              { "border-[#bd1e59]": pathname === RoutePaths.SAVED }
            )}
            href={RoutePaths.SAVED}
          >
            Saved Recipes
          </Link>
        )}
        <Link
          className={cn(
            "text-[#bd1e59] hover:text-[#a61a4f] border-b-2 border-transparent hover:border-[#bd1e59]",
            { "border-[#bd1e59]": pathname === RoutePaths.BILLING }
          )}
          href={RoutePaths.BILLING}
        >
          My Plan
        </Link>
      </div>
      {children}
    </div>
  );
};
