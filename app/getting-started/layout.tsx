"use client";

import BoxReveal from "@/components/ui/box-reveal";
import { cn } from "@/lib/utils";
import {
  BookIcon,
  BookOpenIcon,
  CodeIcon,
  CommandIcon,
  DownloadIcon,
  FileTextIcon,
  GitBranchIcon,
  GithubIcon,
  PackageIcon,
  ShieldIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("installation");
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  useEffect(() => {
    // This function determines which section and subsection should be active based on scroll position
    const calculateActiveSection = () => {
      // Get main sections and list items (subsections) with IDs
      const sections = document.querySelectorAll("section[id]");
      const subItems = document.querySelectorAll("li[id]");

      if (!sections.length) return;

      // Special case for top of page - if we're at the very top, highlight "installation"
      if (window.scrollY < 50) {
        setActiveSection("installation");
        setActiveSubSection(null);
        return;
      }

      // Set a threshold from the top of the viewport
      const topThreshold = 150; // pixels from the top

      // First, determine the active main section
      // Create a sorted array of sections to check (top to bottom in document order)
      const sortedSections = [...Array.from(sections)].sort((a, b) => {
        const aPosition = a.getBoundingClientRect().top + window.scrollY;
        const bPosition = b.getBoundingClientRect().top + window.scrollY;
        return bPosition - aPosition;
      });

      // Find which main section is active
      let activeMainSection = null;

      // First look for a section near the top of the viewport
      for (const section of sortedSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= topThreshold && rect.bottom > 0) {
          activeMainSection = section;
          break;
        }
      }

      // If no section found yet, find the last section that's still partially visible
      if (!activeMainSection) {
        let lastVisibleSection = null;
        for (const section of sortedSections) {
          const rect = section.getBoundingClientRect();
          if (rect.bottom > 0) {
            lastVisibleSection = section;
          }
        }
        activeMainSection = lastVisibleSection;
      }

      // Now, look for active subsection (list item)
      // We'll only consider list items that are currently visible
      let activeSubItem = null;

      // Sort subsections from top to bottom
      const sortedSubItems = [...Array.from(subItems)].sort((a, b) => {
        const aPosition = a.getBoundingClientRect().top + window.scrollY;
        const bPosition = b.getBoundingClientRect().top + window.scrollY;
        return bPosition - aPosition;
      });

      // First, try to find a subsection near the top of the viewport
      for (const item of sortedSubItems) {
        const rect = item.getBoundingClientRect();
        if (rect.top <= topThreshold + 50 && rect.bottom > 0) {
          activeSubItem = item;
          break;
        }
      }

      // If no subsection found yet, check if any subsection is visible
      if (!activeSubItem) {
        for (const item of sortedSubItems) {
          const rect = item.getBoundingClientRect();
          // Consider an item visible if it's at least halfway in the viewport
          if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
            activeSubItem = item;
            break;
          }
        }
      }

      // Update states based on what we found
      if (activeMainSection) {
        // If we're in the basic-usage section, we want it to stay highlighted
        // even when subsections are active
        const mainSectionId = activeMainSection.id;
        setActiveSection(mainSectionId);

        // If we found a subsection and it's related to the current section, set it
        if (activeSubItem) {
          const subItemId = activeSubItem.id;

          // If the subsection is one of the "basic-usage" children, keep both highlighted
          const basicUsageChildren = [
            "configuration",
            "adding-rules",
            "sync-rules",
            "add-script-alias",
          ];

          if (basicUsageChildren.includes(subItemId)) {
            // This is a subsection of basic-usage
            setActiveSubSection(subItemId);
          } else {
            // Not a recognized subsection, so clear the activeSubSection
            setActiveSubSection(null);
          }
        } else {
          // No subsection visible, clear the activeSubSection
          setActiveSubSection(null);
        }
      } else {
        // Default to the first section if nothing else is found
        setActiveSection("installation");
        setActiveSubSection(null);
      }
    };

    // Add IDs to any sections missing them (based on headings)
    document.querySelectorAll("section").forEach((section, index) => {
      if (!section.id) {
        const heading = section.querySelector("h2");
        if (heading) {
          const headingText = heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-");
          if (headingText) {
            section.id = headingText;
          } else {
            section.id = `section-${index}`;
          }
        } else {
          section.id = `section-${index}`;
        }
      }
    });

    // Make sure we have sections to track
    const checkSections = () => {
      const sections = document.querySelectorAll("section[id]");
      if (!sections.length) {
        console.warn("No sections with IDs found for scroll tracking");
      } else {
        // Print a confirmation message to help with debugging
        console.log(`Found ${sections.length} sections for scroll tracking`);
      }
    };

    // Run initial setup
    setTimeout(() => {
      checkSections();
      calculateActiveSection();

      // Force an update for the first section explicitly
      const firstSection = document.querySelector('section[id="installation"]');
      if (firstSection && window.scrollY < 100) {
        setActiveSection("installation");
      }
    }, 100); // Small delay to ensure DOM is fully rendered

    // Add scroll event listener with throttling
    let isScrolling = false;
    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          calculateActiveSection();
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateActiveSection, {
      passive: true,
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateActiveSection);
    };
  }, []);

  const isActive = (sectionId: string) => {
    // For main sections
    if (activeSection === sectionId) return true;

    // For subsections - check if this is the active subsection
    if (activeSubSection === sectionId) return true;

    return false;
  };

  const getLinkClassName = (sectionId: string) => {
    return cn(
      "flex items-center gap-2 py-1 px-2 rounded-md transition-colors duration-200",
      isActive(sectionId)
        ? "text-primary bg-primary/10 font-medium"
        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
    );
  };

  return (
    <div className="flex min-h-screen container mx-auto px-4 py-16">
      <aside className="min-w-56 mr-8 relative">
        <div className="sticky top-16">
          <BoxReveal boxColor="#f4f4f4">
            <div>
              <section className="mb-12">
                {/* <h2 className="text-xl font-semibold mb-4 text-gray-600">
                  Table of Contents
                </h2> */}
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="#installation"
                      className={getLinkClassName("installation")}
                    >
                      <PackageIcon className="w-4 h-4" />
                      <span>Installation</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#basic-usage"
                      className={getLinkClassName("basic-usage")}
                    >
                      <CommandIcon className="w-4 h-4" />
                      <span>Basic Usage</span>
                    </Link>
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <Link
                          href="#configuration"
                          className={getLinkClassName("configuration")}
                        >
                          <FileTextIcon className="w-4 h-4" />
                          <span>Configuration</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#adding-rules"
                          className={getLinkClassName("adding-rules")}
                        >
                          <ShieldIcon className="w-4 h-4" />
                          <span>Adding Rules</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#sync-rules"
                          className={getLinkClassName("sync-rules")}
                        >
                          <DownloadIcon className="w-4 h-4" />
                          <span>Syncing Rules</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#add-script-alias"
                          className={getLinkClassName("add-script-alias")}
                        >
                          <CodeIcon className="w-4 h-4" />
                          <span>Script Alias</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      href="#common-rule-examples"
                      className={getLinkClassName("common-rule-examples")}
                    >
                      <GitBranchIcon className="w-4 h-4" />
                      <span>Rule Examples</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#next-steps"
                      className={getLinkClassName("next-steps")}
                    >
                      <BookOpenIcon className="w-4 h-4" />
                      <span>Next Steps</span>
                    </Link>
                  </li>
                </ul>
              </section>
              <div className="mt-8 pt-4 border-t border-gray-200">
                <Link
                  href="/docs"
                  className="flex items-center text-gray-400 hover:text-gray-600 gap-2"
                >
                  <BookIcon className="w-4 h-4" />
                  <span>Full Documentation</span>
                </Link>
                <Link
                  href="https://github.com/gfargo/vercel-doorman"
                  className="flex items-center text-gray-400 hover:text-gray-600 gap-2 mt-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>
          </BoxReveal>
        </div>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
