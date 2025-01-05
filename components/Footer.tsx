import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center p-5 w-full border-t flex sm:flex-row flex-col justify-between items-center border-gray-200">
      <div className="flex space-x-4 sm:pb-0 ml-auto items-center gap-4">
        <div className="flex gap-3">
          <div className="text-gray-500 text-sm">
            <Link
              className="text-sky-800 hover:underline font-bold"
              href="https://vercel.com/"
              target="_blank"
            >
              Terms Of Service
            </Link>
          </div>
          <div className="text-gray-500 text-sm">
            <Link
              className="text-sky-800 hover:underline font-bold"
              href="https://vercel.com/"
              target="_blank"
            >
              Privacy Notice
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-500">&#169; 2024 Simply Simmer</p>
      </div>
    </footer>
  );
}
