"use client";

import React from "react";

import { manageSubscription } from "@/lib/manage-subscription";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/lib/constants";

type Props = {
  stripeCustomerId?: string | null;
  billingUrl?: string;
};

export function ManageSubscriptionButton({
  stripeCustomerId,
  billingUrl,
}: Props) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const session = await manageSubscription({
          stripeCustomerId,
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
        disabled={isPending}
        className="flex gap-2 border-none bg-[#bd1e59] hover:bg-[#a4043f]"
      >
        Manage Subscription
      </Button>
    </form>
  );
}
