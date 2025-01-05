import Link from "next/link";
import { redirect } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/lib/constants";
import { useServerUserSession } from "@/lib/hooks";
import Messages from "./messages";

export const dynamic = "force-dynamic";

export default async function Login() {
  const user = await useServerUserSession();

  if (user) {
    return redirect(RoutePaths.OVERVIEW);
  }
  return (
    <div className="flex flex-col w-full gap-2 bg-[#f0ebe3] h-screen">
      <header className="flex justify-between items-center p-6 bg-[#f0ebe3]">
        <h1 className="font-bold text-2xl">
          <Link href={RoutePaths.HOME}>
            Simply <span className="text-[#eeb08f]">Simmer</span>
          </Link>
        </h1>
      </header>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-auto mt-24" style={{ width: "calc(100% - 1.25rem)" }}>
        <h1 className="text-3xl font-bold text-center">Sign In / Sign Up</h1>
        <p className="text-center text-gray-600">
          Sign into your account or sign up for a new one to get started.
        </p>
        <form className="space-y-4" action="/auth/sign-in" method="post">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-[#bd1e59] rounded-sm"
              id="email"
              required
              type="email"
              name="email"
            />
          </div>
          <Button className="w-full bg-[#bd1e59] text-white hover:bg-[#a61a4f]">
            Send Magic Link
          </Button>
          <Messages />
        </form>
      </div>
    </div>
  );
}
