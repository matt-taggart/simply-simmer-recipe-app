"use client";

import { useTransition } from "react";
import { Button } from "@tremor/react";
import { Rocket } from "lucide-react";

import { subscribe } from "@/lib/subscribe";
import { RoutePaths } from "@/lib/constants";

type Props = {
  email: string;
  userId: string;
  billingUrl: string;
};

export const SubscribeButton = ({ email, userId, billingUrl }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const session = await subscribe({
          email,
          userId,
          billingUrl,
        });
        if (session) {
          window.location.href = session.url ?? RoutePaths.BILLING;
        }
      } catch (err) {
        console.error((err as Error).message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        className="flex gap-2 border-none bg-[#bd1e59] hover:bg-[#a4043f]"
        disabled={isPending}
        icon={Rocket}
        iconPosition="right"
        size="lg"
        loading={isPending}
      >
        Go Pro
      </Button>
    </form>
  );
};
