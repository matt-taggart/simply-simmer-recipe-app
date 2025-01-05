import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { RoutePaths } from "@/lib/constants";
import { useServerUserSession, useIsSubscribed } from "@/lib/hooks";
import { LinkGroup } from "./link-group";
import UserMenu from "@/components/UserMenu";

export const metadata = {
  title: "Simply Simmer",
  description: "Effortlessly Find and Customize Recipes for Any Meal",
};

export default async function RootLayout({ children }: any) {
  const user = await useServerUserSession();

  if (!user) {
    return redirect(RoutePaths.OVERVIEW);
  }

  const isSubscribed = await useIsSubscribed();

  return (
    <div className="flex w-full flex-col pb-8 mx-auto bg-[#f0ebe3] min-h-screen">
      <header className="flex justify-between items-center px-6 py-6 sm:px-24 sm:py-14 bg-[#f0ebe3]">
        <Link href={RoutePaths.HOME}>
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-4xl">
              Simply <span className="text-[#eeb08f]">Simmer</span>
            </h1>
          </div>
        </Link>
        <LinkGroup isSubscribed={isSubscribed}>
          <UserMenu user={user} />
        </LinkGroup>
      </header>
      {children}
    </div>
  );
}
