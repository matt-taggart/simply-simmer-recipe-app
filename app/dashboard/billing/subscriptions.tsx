"use client";

import { Search, UserRound, Blocks, Heart } from "lucide-react";

import { SubscribeButton } from "@/components/subscribe-button";
import { ManageSubscriptionButton } from "@/components/manage-subscription-button";
import { absoluteUrl } from "@/lib/utils";
import { RoutePaths } from "@/lib/constants";

export const Subscriptions = ({ user, subscriptionPlan }) => {
  const { stripeCustomerId, isSubscribed, stripeCurrentPeriodEnd, isCanceled } =
    subscriptionPlan;

  const showModifySubscription = isSubscribed && stripeCustomerId;
  const billingUrl = absoluteUrl(RoutePaths.BILLING);

  const currentPeriodEnd = new Date(
    stripeCurrentPeriodEnd
  )?.toLocaleDateString();

  const planRenewalDetails = !isSubscribed
    ? "You are currently not subscribed to any plan."
    : isCanceled
      ? `Your plan will be canceled on ${currentPeriodEnd}`
      : `Your plan renews on ${currentPeriodEnd}`;

  return (
    <div className="bg-[#f0ebe3] h-full px-4">
      {showModifySubscription ? (
        <div className="flex justify-center py-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-[#eeb08f] mt-8">
            <h1 className="text-xl font-semibold text-[#bd1e59] mb-4">
              Your Plan
            </h1>
            <p className="text-sm text-[#bd1e59] mb-2">USD $4.99/month</p>
            <div className="border-t border-[#bd1e59] pt-4">
              <h2 className="text-lg font-semibold text-[#bd1e59] flex items-center mb-4">
                <CloudLightningIcon className="text-[#bd1e59] mr-2" />
                Pro
              </h2>
              <ul className="list-inside list-disc space-y-2 mb-4 text-sm text-black">
                <li>
                  Discover new recipes with our powerful search functionality.
                </li>
                <li>Access all recipes with zero ads.</li>
                <li>
                  Modify recipes to suit your dietary restrictions or
                  preferences.
                </li>
                <li>Save recipes for easy access.</li>
              </ul>
              <p className="text-sm mb-4">{planRenewalDetails}</p>
              <ManageSubscriptionButton
                stripeCustomerId={stripeCustomerId}
                billingUrl={billingUrl}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-[#eeb08f] mt-8">
            <h1 className="text-xl font-semibold text-[#bd1e59] mb-4">
              Upgrade to Pro
            </h1>
            <div className="space-y-4 mb-4">
              <p className="text-sm text-gray-600 mb-4 flex items-center">
                <Search className="inline h-5 w-5 mr-2 text-[#bd1e59]" />
                <span>
                  Ultra fast recipe search. Find your favorite recipes in
                  seconds.
                </span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <Blocks className="inline h-5 w-5 mr-2 text-[#bd1e59]" />
                <span>Ad-free recipe access. Say goodbye to distractions.</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <Heart className="inline h-5 w-5 mr-2 text-[#bd1e59]" />
                <span>
                  Save your favorite recipes. Never lose a recipe again.
                </span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <UserRound className="inline h-5 w-5 mr-2 text-[#bd1e59]" />
                <span>
                  Personalize your favorite recipes. Tailor them to your taste.
                </span>
              </p>
              <p className="text-sm text-[#eeb08f]">
                Auto-renews for $4.99/month until canceled.
              </p>
            </div>
            <SubscribeButton
              email={user.email}
              userId={user.id}
              billingUrl={billingUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function CloudLightningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}
