"use client";

import { useTheme } from "next-themes";
import HyperText from "./ui/hyper-text";
import ShineBorder from "./ui/shine-border";

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <ShineBorder
      className="place-items-start p-6 shadow-md"
      duration={20}
      color={theme.theme === "dark" ? "white" : "black"}
    >
      <div className="flex items-center">
        <div className="bg-gray-100 p-2 rounded-full mr-4">{icon}</div>
        <HyperText
          className="text-xl font-semibold text-black dark:text-white"
          text={title}
        />
      </div>
      <p className="text-gray-600 pl-14">{description}</p>
    </ShineBorder>
  );
}
