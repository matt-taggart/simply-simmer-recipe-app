"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const SignInButton = () => {
  const router = useRouter();

  // Access the current route
  const currentRoute = router.pathname;

  return (
    <>
      {currentRoute === "/" ? (
        <Button
          size="lg"
          className="bg-transparent text-[#eeb08f] hover:bg-[#eeb08f] hover:text-white border border-[#eeb08f]"
        >
          <Link href="/login">Sign In/Sign Up</Link>
        </Button>
      ) : null}
    </>
  );
};
