import React from "react";
import { AvatarIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function UserMenu({ user }) {
  return (
    <>
      {user && (
        <div className="flex flex-row gap-4 text-center align-middle justify-start sm:justify-center w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <AvatarIcon
                height={30}
                width={30}
                className="text-primary"
                color="#bd1e59"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis text-gray-600">
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form action="/auth/sign-out" method="post">
                <Button
                  type="submit"
                  className="w-full text-left text-[#bd1e59] hover:text-[#a61a4f]"
                  variant={"ghost"}
                >
                  Log out
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
