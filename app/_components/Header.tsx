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
                className="text-gray-600 hover:text-black transition-colors"
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
