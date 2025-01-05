import { Card } from "@tremor/react";
import { Zap, Check, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { inter } from "@/lib/styles";

const BasicFeatureItem = ({ children }) => {
  return (
    <div className="flex gap-2 align-baseline">
      <X className="h-5 w-5" style={{ color: "rgb(107, 114, 128)" }} />
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {children}
      </p>
    </div>
  );
};

const FeatureItem = ({ children }) => {
  return (
    <div className="flex gap-2 align-baseline">
      <Check className="h-5 w-5 text-lightGreen" />
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {children}
      </p>
    </div>
  );
};

export default function PricingSection() {
  return (
    <div
      className={cn(
        "w-full max-w-6xl mt-16 mb-16 p-8 rounded-lg space-y-8",
        inter.className
      )}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
      <div className="flex flex-wrap justify-center lg:space-x-4 space-y-4 lg:space-y-0 items-stretch">
        <Card
          className="max-w-md mx-auto flex flex-col m-0"
          decoration="top"
          decorationColor="indigo"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex align-baseline gap-1">
                <p
                  className="text-tremor-default text-tremor-content dark:text-dark-tremor-content self-center"
                  style={{ fontSize: "1.5rem" }}
                >
                  Basic Plan
                </p>
              </div>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                No Cost
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <FeatureItem>Access all recipes with zero ads.</FeatureItem>
              <FeatureItem>Includes 3 searches/recipes per month.</FeatureItem>
              <BasicFeatureItem>
                Discover new recipes with our powerful search functionality.
              </BasicFeatureItem>
              <BasicFeatureItem>
                Modify recipes to suit your dietary restrictions or preferences.
              </BasicFeatureItem>
              <BasicFeatureItem>Save recipes for easy access.</BasicFeatureItem>
            </div>
          </div>
        </Card>
        <Card
          className="max-w-md mx-auto flex flex-col m-0"
          decoration="top"
          decorationColor="indigo"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex align-center gap-1">
                <p
                  className="text-tremor-default text-tremor-content dark:text-dark-tremor-content self-center"
                  style={{ fontSize: "1.5rem", color: "rgb(22 163 74)" }}
                >
                  Pro Plan
                </p>
                <Zap color="rgb(22 163 74)" />
              </div>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                USD $4.99/month
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <FeatureItem>Access all recipes with zero ads.</FeatureItem>
              <FeatureItem>
                Includes 1000 searches/recipes per month.
              </FeatureItem>
              <FeatureItem>
                Discover new recipes with our powerful search functionality.
              </FeatureItem>
              <FeatureItem>
                Modify recipes to suit your dietary restrictions or preferences.
              </FeatureItem>
              <FeatureItem>Save recipes for easy access.</FeatureItem>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
