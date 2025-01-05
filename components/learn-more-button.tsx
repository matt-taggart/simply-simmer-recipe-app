"use client";

import { Button } from "@/components/ui/button";

export const LearnMoreButton = () => {
  return (
    <a
      href="#container"
      onClick={(event) => {
        event.preventDefault();
        const element = document.getElementById("container");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <Button
        size="lg"
        className="bg-transparent text-[#eeb08f] hover:bg-[#eeb08f] hover:text-white border border-[#eeb08f]"
      >
        Learn more
      </Button>
    </a>
  );
};
