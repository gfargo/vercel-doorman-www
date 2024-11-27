import { InteractiveImage } from "@/components/InteractiveImage";
import WordPullUp from "@/components/ui/word-pull-up";
import { cn } from "@/lib/utils";
import { CopyableCommand } from './CopyableCommand';

export function FeatureSection({
  title,
  description,
  icon,
  imageSrc,
  command,
  direction = "left",
  flow,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  direction?: "left" | "right";
  imageSrc: string;
  flow?: React.ReactNode;
  command: {
    value: string;
    command: string;
  }[];
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center gap-8",
        direction === "right" && "md:flex-row-reverse"
      )}
    >
      <div className="md:w-1/2 lg:w-2/3 flex flex-col gap-4 items-center">
        <div className="p-4 bg-white/50">
          <div className="flex items-center mb-4">
            {icon}
            <WordPullUp
              className="text-2xl font-bold ml-4 tracking-[-0.02em] text-black dark:text-white md:text-4xl md:leading-[5rem]"
              words={title}
            />
            {/* <h3 className="text-2xl font-bold ml-4">{title}</h3> */}
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <CopyableCommand command={command} />
        </div>
      </div>
      <div className="md:w-1/2 relative">
        <InteractiveImage
          src={imageSrc}
          alt={`${title} feature`}
          flow={flow}
        />
      </div>
    </div>
  );
}
