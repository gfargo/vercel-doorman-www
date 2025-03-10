"use client";

import BoxReveal from "@/components/ui/box-reveal";
import { cn } from "@/lib/utils";
import {
  BookIcon,
  CheckIcon,
  CogIcon,
  DownloadIcon,
  FileJson2Icon,
  FileTextIcon,
  FolderSyncIcon,
  GitBranchIcon,
  ListIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  useEffect(() => {
    // This function determines which section and subsection should be active based on scroll position
    const calculateActiveSection = () => {
      // Get main sections and command list items (subsections)
      const sections = document.querySelectorAll("section[id]");
      const commandItems = document.querySelectorAll('li[id^="commands-"]');

      if (!sections.length) return;

      // Special case for top of page - if we're at the very top, highlight "introduction"
      if (window.scrollY < 50) {
        setActiveSection("introduction");
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

      // Now, look for active command subsection
      let activeCommandItem = null;

      // Sort command items from top to bottom
      const sortedCommandItems = [...Array.from(commandItems)].sort((a, b) => {
        const aPosition = a.getBoundingClientRect().top + window.scrollY;
        const bPosition = b.getBoundingClientRect().top + window.scrollY;
        return aPosition - bPosition;
      });

      // First, try to find a command item near the top of the viewport
      for (const item of sortedCommandItems) {
        const rect = item.getBoundingClientRect();
        if (rect.top <= topThreshold + 50 && rect.bottom > 0) {
          activeCommandItem = item;
          break;
        }
      }

      // If no command item found yet, check if any command item is visible
      if (!activeCommandItem) {
        for (const item of sortedCommandItems) {
          const rect = item.getBoundingClientRect();
          // Consider an item visible if it's at least halfway in the viewport
          if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
            activeCommandItem = item;
            break;
          }
        }
      }

      // Update states based on what we found
      if (activeMainSection) {
        const mainSectionId = activeMainSection.id;
        setActiveSection(mainSectionId);

        // If we found a command item and it's related to the commands section, set it
        if (
          activeCommandItem &&
          (mainSectionId === "commands" ||
            activeCommandItem.id.startsWith("commands-"))
        ) {
          // If this is a commands subsection, keep both "commands" and the specific command highlighted
          setActiveSubSection(activeCommandItem.id);
        } else {
          // No command subsection visible or applicable, clear the activeSubSection
          setActiveSubSection(null);
        }
      } else {
        // Default to the first section if nothing else is found
        setActiveSection("introduction");
        setActiveSubSection(null);
      }
    };

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
      const firstSection = document.querySelector('section[id="introduction"]');
      if (firstSection && window.scrollY < 100) {
        setActiveSection("introduction");
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
    // For main sections - direct match
    if (activeSection === sectionId) return true;

    // For commands parent section - keep highlighted when any command subsection is active
    if (
      sectionId === "commands" &&
      activeSubSection &&
      activeSubSection.startsWith("commands-")
    )
      return true;

    // For command subsections - check if this is the active subsection
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
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-600">
                Table of Contents
              </h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#introduction"
                    className={getLinkClassName("introduction")}
                  >
                    <BookIcon className="w-4 h-4" />
                    <span>Introduction</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#installation"
                    className={getLinkClassName("installation")}
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Installation</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#configuration"
                    className={getLinkClassName("configuration")}
                  >
                    <CogIcon className="w-4 h-4" />
                    <span>Configuration</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#environment-variables"
                    className={getLinkClassName("environment-variables")}
                  >
                    <FileTextIcon className="w-4 h-4" />
                    <span>Environment Variables</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#commands"
                    className={getLinkClassName("commands")}
                  >
                    <TerminalIcon className="w-4 h-4" />
                    <span>Commands</span>
                  </Link>
                  <ul className="ml-6 mt-1 space-y-1">
                    <li>
                      <Link
                        href="#commands-list"
                        className={getLinkClassName("commands-list")}
                      >
                        <ListIcon className="w-4 h-4" />
                        <span>List</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands-sync"
                        className={getLinkClassName("commands-sync")}
                      >
                        <FolderSyncIcon className="w-4 h-4" />
                        <span>Sync</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands-download"
                        className={getLinkClassName("commands-download")}
                      >
                        <DownloadIcon className="w-4 h-4" />
                        <span>Download</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands-template"
                        className={getLinkClassName("commands-template")}
                      >
                        <FileJson2Icon className="w-4 h-4" />
                        <span>Template</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#commands-validate"
                        className={getLinkClassName("commands-validate")}
                      >
                        <CheckIcon className="w-4 h-4" />
                        <span>Validate</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    href="#examples"
                    className={getLinkClassName("examples")}
                  >
                    <GitBranchIcon className="w-4 h-4" />
                    <span>Examples</span>
                  </Link>
                </li>
              </ul>
            </section>
          </BoxReveal>
        </div>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
