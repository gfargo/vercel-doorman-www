import { Github } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-white border-b relative z-10">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold font-mono"
          >
            Vercel Doorman
          </Link>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <Link
                href="https://npmjs.com/package/vercel-doorman"
                className="text-gray-600 hover:text-black transition-colors mr-6"
              >
                <div className="w-10 mt-1 flex items-center justify-center">
                  <NpmIcon />
                </div>
                <span className="sr-only">npm</span>
              </Link>
              <Link
                href="/docs"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/getting-started"
                className="bg-black text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-800"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/gfargo/vercel-doorman"
                className="text-gray-600 hover:text-black transition-colorzs"
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

const NpmIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 18 7"
    >
      <path
        fill="#CB3837"
        d="M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z"
      />
      <polygon
        fill="#FFFFFF"
        points="1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 "
      />
      <path
        fill="#FFFFFF"
        d="M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z"
      />
      <polygon
        fill="#FFFFFF"
        points="11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 "
      />
    </svg>
  );
};
