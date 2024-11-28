"use client"

import { cn } from "@/lib/utils"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export const HeaderNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="">
      <div className="flex justify-between items-center h-16">
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={cn(
              "p-2 text-gray-400 hover:text-black transition-colors",
              {
                "text-black": isMenuOpen,
              }
            )}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <DesktopLinks />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute left-0 border-t w-full border-b shadow-lg z-10">
          <MobileLinks setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </div>
  )
}

const DesktopLinks = () => (
  <>
    <Link
      href="https://npmjs.com/package/vercel-doorman"
      className="text-gray-600 hover:text-black transition-colors"
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
      className="text-gray-600 hover:text-black transition-colors"
    >
      <Github className="w-6 h-6" />
      <span className="sr-only">GitHub</span>
    </Link>
  </>
)

const MobileLinks = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (isOpen: boolean) => void
}) => (
  <div className="flex flex-col space-y-4 p-4">
    <Link
      href="/docs"
      onClick={() => setIsMenuOpen(false)}
      className="text-gray-600 hover:text-black transition-colors"
    >
      Docs <span className="sr-only">Documentation</span>
    </Link>
    <Link
      href="/getting-started"
      onClick={() => setIsMenuOpen(false)}
      className="bg-black text-white px-4 py-2 rounded-md text-center transition-colors hover:bg-gray-800"
    >
      Get Started
    </Link>
    <Link
      href="https://github.com/gfargo/vercel-doorman"
      target="_blank"
      className="text-gray-600 hover:text-black transition-colors flex items-center"
    >
      View on GitHub <GitHubLogoIcon className="w-6 h-6 ml-1.5" />
    </Link>
    <Link
      href="https://npmjs.com/package/vercel-doorman"
      target="_blank"
      className="text-gray-600 hover:text-black transition-colors flex items-center"
    >
      Package on{" "}
      <span className="ml-2 mt-1.5">
        <NpmIcon />
      </span>
    </Link>
  </div>
)

const NpmIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 18 7"
      className="w-12 h-12"
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
  )
}
