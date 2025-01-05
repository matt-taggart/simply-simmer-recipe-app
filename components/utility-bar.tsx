import { Check, Copy, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  printAction: () => void;
  copyAction: (text: string) => void;
  textToCopy: string;
  copyState: boolean;
};

export const UtilityBar = ({
  printAction,
  copyAction,
  textToCopy,
  copyState,
}: Props) => {
  return (
    <div className="relative z-1">
      <Button
        onClick={() => printAction()}
        size="icon"
        variant="ghost"
        className="h-8 w-8 opacity-50 hover:opacity-100"
        style={{ zIndex: "-1" }}
      >
        <Printer className="text-[#bd1e59] h-4 w-4" />
      </Button>
      <Button
        onClick={() => copyAction(textToCopy)}
        size="icon"
        variant="ghost"
        className="h-8 w-8 opacity-50 hover:opacity-100"
      >
        {copyState ? (
          <Check className="text-[#bd1e59] h-4 w-4" />
        ) : (
          <Copy className="text-[#bd1e59] h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
