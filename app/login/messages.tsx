"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <div className="p-4 rounded-md bg-red-100 text-red-700">
          <p className="text-center">{error}</p>
        </div>
      )}
      {message && (
        <div className="p-4 rounded-md bg-green-100 text-green-700">
          <p className="text-center">{message}</p>
        </div>
      )}
    </>
  );
}
