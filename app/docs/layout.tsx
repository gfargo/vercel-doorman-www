import BoxReveal from "@/components/ui/box-reveal";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen container mx-auto px-4 py-16">
      <aside className="w-72 mr-8 relative">
        <div className="sticky top-16">
          <BoxReveal boxColor="#f4f4f4">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-600 sr-only">
                Table of Contents
              </h2>
              <ul className="space-y-2 ">
                <li>
                  <Link
                    href="#introduction"
                    className="text-gray-400 hover:underline hover:text-gray-600"
                  >
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link
                    href="#installation"
                    className="text-gray-400 hover:underline hover:text-gray-600"
                  >
                    Installation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#configuration"
                    className="text-gray-400 hover:underline hover:text-gray-600"
                  >
                    Configuration
                  </Link>
                </li>
                <li>
                  <Link
                    href="#environment-variables"
                    className="text-gray-400 hover:underline hover:text-gray-600"
                  >
                    Environment Variables
                  </Link>
                </li>
                <li>
                  <Link
                    href="#commands"
                    className="text-gray-400 hover:underline hover:text-gray-600"
                  >
                    Commands
                  </Link>
                  <ul className="ml-4 space-y-2 p-2">
                    <li>
                      <Link
                        href="#commands/list"
                        className="text-gray-400 hover:underline hover:text-gray-600"
                      >
                        List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands/sync"
                        className="text-gray-400 hover:underline hover:text-gray-600"
                      >
                        Sync
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands/download"
                        className="text-gray-400 hover:underline hover:text-gray-600"
                      >
                        Download
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands/template"
                        className="text-gray-400 hover:underline hover:text-gray-600"
                      >
                        Template
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands/validate"
                        className="text-gray-400 hover:underline hover:text-gray-600"
                      >
                        Validate
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    href="#examples"
                    className="text-gray-400 hover:underline hover:text-gray-600"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </section>
          </BoxReveal>
        </div>
      </aside>
      <div className="">{children}</div>
    </div>
  );
}
