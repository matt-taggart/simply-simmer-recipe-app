"use client";

import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  DOMAIN_REGEX,
  FRAGMENT_LOCATOR_REGEX,
  IP_REGEX,
  PORT_AND_PATH_REGEX,
  PROTOCOL_REGEX,
  QUERY_STRING_REGEX,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface useCopyToClipboardProps {
  timeout?: number;
}

export function useCopyToClipboard({
  timeout = 2000,
}: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<Boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}

export const ensureHttps = (url: string) => {
  const generalUrlRegex = new RegExp(
    PROTOCOL_REGEX +
    DOMAIN_REGEX +
    IP_REGEX +
    "(localhost))" +
    PORT_AND_PATH_REGEX +
    QUERY_STRING_REGEX +
    FRAGMENT_LOCATOR_REGEX,
    "i"
  );

  const protocolRegex = new RegExp("^https?:\\/\\/", "i");

  if (generalUrlRegex.test(url) && !protocolRegex.test(url)) {
    // If it's a valid URL but lacks the protocol, prepend 'https://'
    return "https://" + url;
  } else if (!generalUrlRegex.test(url)) {
    // If it's not a valid URL, return an error or handle accordingly
    return false;
  }

  // If it's already a valid URL with protocol, return it as is
  return url;
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
    }${path}`;
}
