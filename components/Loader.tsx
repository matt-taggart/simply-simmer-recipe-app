import { Loader2 } from "lucide-react";

type Props = {
  isLoading: boolean;
};

export const Loader = ({ isLoading }: Props) => {
  return (
    isLoading && (
      <div className="flex flex-col justify-center items-center mt-6">
        <p className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words pb-5 text-center text-tremor-title text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
          AI is generating your results...
        </p>
        <Loader2 className="h-10 w-10 animate-spin text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis" />
      </div>
    )
  );
};
