import {
  Book,
  ChevronRight,
  DownloadCloudIcon,
  ExternalLink,
  FileJsonIcon,
  FolderSyncIcon,
  GitBranch,
  ListTodoIcon,
  ScanEyeIcon,
  Shield,
  Workflow,
} from "lucide-react"
import Link from "next/link"
import { CopyableCommand } from "../components/CopyableCommand"
// import { Marquee } from "../components/ui/marquee";
import { FeatureCard } from "@/components/FeatureCard"
import { DownloadFlowBeam } from "@/components/flows/DownloadFlow"
import { ListFlow } from "@/components/flows/ListFlow"
import { SyncFlow } from "@/components/flows/SyncFlow"
import { TemplateFlow } from "@/components/flows/TemplateFlow"
import { ValidateFlow } from "@/components/flows/ValidateFlow"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import BlurIn from "@/components/ui/blur-in"
import BoxReveal from "@/components/ui/box-reveal"
import { Button } from "@/components/ui/button"
import DotPattern from "@/components/ui/dot-pattern"
import HyperText from "@/components/ui/hyper-text"
import Meteors from "@/components/ui/meteors"
import { cn } from "@/lib/utils"
import { DoubleArrowDownIcon } from "@radix-ui/react-icons"
import { FeatureSection } from "../components/FeatureSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
      <main className="">
        <section className="container px-4 md:px-0 mx-auto relative text-center py-24 mb-16 overflow-hidden">
          <div className="relative z-10">
            <BlurIn
              word="your ▲ firewall as .config"
              className="text-6xl font-bold mb-6 text-black dark:text-white bg-gradient-to-b from-black to-gray-900/90 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10"
            />
            <p className="text-xl text-gray-600 mt-8 md:mt-0 mb-12 max-w-2xl mx-auto">
              Manage{" "}
              <Link
                className="text-gray-800 underline hover:text-gray-400 hover:no-underline"
                href="https://vercel.com/docs/security/vercel-firewall"
                target="_blank"
              >
                Vercel Firewall
              </Link>{" "}
              rules as code, enabling version control and automated deployment
              of your project's security configuration.
            </p>
            <div className="w-full flex justify-center">
              <CopyableCommand
                command={[
                  { value: "npm", command: "npm install vercel-doorman" },
                  { value: "yarn", command: "yarn add vercel-doorman" },
                  { value: "pnpm", command: "pnpm add vercel-doorman" },
                  { value: "bun", command: "bun add vercel-doorman" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="container px-4 md:px-0 mx-auto grid grid-cols-1 justify-items-center lg:grid-cols-3 gap-8 space-y-8 lg:space-y-0 mb-24 xl:px-4">
          <FeatureCard
            icon={<GitBranch className="w-6 h-6" />}
            title="Version Control"
            description="Track changes and collaborate effectively on your firewall rules."
          />
          <FeatureCard
            icon={<Workflow className="w-6 h-6" />}
            title="Automation"
            description="Integrate firewall management into your CI/CD pipelines."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Consistency"
            description="Ensure security configurations are consistent across environments."
          />
        </section>

        <section className="container px-4 md:px-0  mx-auto mb-24 pb-16 relative overflow-hidden">
          <AnimatedGridPattern
            numSquares={100}
            maxOpacity={0.15}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] z-0",
              "inset-x-0 inset-y-[-30%] h-[180%] skew-y-12"
            )}
          />

          <div className="my-16 text-center text-gray-500 flex self-center flex-col justify-center items-center">
            <HyperText
              className="text-xs font-bold dark:text-white w-auto"
              text={"FEATURES"}
            />
            <DoubleArrowDownIcon className="w-3 h-3 mt-3" />
          </div>
          <div className="space-y-24 relative z-10 pb-24 lg:px-8">
            <FeatureSection
              title="Sync Changes"
              description="Synchronize rules between local configuration and Vercel. Keep your firewall rules up-to-date across all environments with a single command."
              icon={<FolderSyncIcon className="w-6 h-6" />}
              flow={<SyncFlow />}
              imageSrc="/gifs/demo-sync.gif"
              command={[
                { value: "npm", command: "npx vercel-doorman sync" },
                { value: "yarn", command: "npx vercel-doorman sync" },
                {
                  value: "pnpm",
                  command: "pnpm dlx vercel-doorman@latest sync",
                },
                {
                  value: "bun",
                  command: "bunx --bun vercel-doorman@latest sync",
                },
              ]}
            />
            <FeatureSection
              title="Download Config"
              direction="right"
              description="Export your current firewall configuration to a local config file. Backup and version control your security settings with ease."
              icon={<DownloadCloudIcon className="w-6 h-6" />}
              flow={<DownloadFlowBeam />}
              imageSrc="/gifs/demo-download.gif"
              command={[
                { value: "npm", command: "npx vercel-doorman download" },
                { value: "yarn", command: "npx vercel-doorman download" },
                {
                  value: "pnpm",
                  command: "pnpm dlx vercel-doorman@latest download",
                },
                {
                  value: "bun",
                  command: "bunx --bun vercel-doorman@latest download",
                },
              ]}
            />
            <FeatureSection
              title="List Rules & IPs"
              description="Display current firewall configuration in either a table or JSON format. Easily inspect and understand your deployed security configurations at a glance."
              icon={<ListTodoIcon className="w-6 h-6" />}
              flow={<ListFlow />}
              imageSrc="/gifs/demo-list2.gif"
              command={[
                { value: "npm", command: "npx vercel-doorman list" },
                { value: "yarn", command: "npx vercel-doorman list" },
                {
                  value: "pnpm",
                  command: "pnpm dlx vercel-doorman@latest list",
                },
                {
                  value: "bun",
                  command: "bunx --bun vercel-doorman@latest list",
                },
              ]}
            />
            <FeatureSection
              title="Validate Rules"
              direction="right"
              description="Check your local configuration for errors and inconsistencies. Ensure your firewall rules are valid before deploying to Vercel."
              icon={<ScanEyeIcon className="w-6 h-6" />}
              flow={<ValidateFlow />}
              // TODO REPLACE WITH NEW GIF
              imageSrc="/gifs/demo-download.gif"
              command={[
                { value: "npm", command: "npx vercel-doorman validate" },
                { value: "yarn", command: "npx vercel-doorman validate" },
                {
                  value: "pnpm",
                  command: "pnpm dlx vercel-doorman@latest validate",
                },
                {
                  value: "bun",
                  command: "bunx --bun vercel-doorman@latest validate",
                },
              ]}
            />
            <FeatureSection
              title="Use Templates"
              description="Get started quickly with pre-configured templates for common use cases. Customize and extend templates to fit your project's needs."
              icon={<FileJsonIcon className="w-6 h-6" />}
              flow={<TemplateFlow />}
              // TODO REPLACE WITH NEW GIF
              imageSrc="/gifs/demo-sync.gif"
              command={[
                { value: "npm", command: "npx vercel-doorman template" },
                { value: "yarn", command: "npx vercel-doorman template" },
                {
                  value: "pnpm",
                  command: "pnpm dlx vercel-doorman@latest template",
                },
                {
                  value: "bun",
                  command: "bunx --bun vercel-doorman@latest template",
                },
              ]}
            />
          </div>
        </section>

        {/* <section className="mb-16 py-12 bg-gray-50">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Users Say
          </h2>

          <ReviewsMarquee />
        </section> */}

        <section className="bg-slate-950 text-primary-foreground p-8 py-16 text-center relative overflow-hidden">
          <div className="z-0 relative opacity-70">
            <Meteors number={12} />
          </div>
          <div className="z-10 relative">
            <div className="flex flex-col items-center justify-center gap-4">
              <BoxReveal
                boxColor={"hsl(var(--primary-foreground))"}
                duration={0.5}
              >
                <h2 className="text-2xl font-bold">
                  Ready to secure your Vercel deployments?
                </h2>
              </BoxReveal>
              <BoxReveal
                boxColor={"hsl(var(--primary-foreground))"}
                duration={0.5}
              >
                <p className="text-gray-400 mb-6">
                  Get started with Vercel Doorman today and take control of your
                  firewall rules.
                </p>
              </BoxReveal>
              <BoxReveal
                boxColor={"hsl(var(--primary-foreground))"}
                duration={0.6}
              >
                <div className="flex flex-col items-center space-y-8">
                  <div className="flex justify-center space-x-4">
                    <Button
                      asChild
                      variant="outline"
                      className="bg-inherit"
                    >
                      <Link href="/docs">
                        <Book className="w-5 h-5 mr-2" />
                        View Docs
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                    >
                      <Link href="/getting-started">
                        <ChevronRight className="w-5 h-5 mr-2" />
                        Getting Started
                      </Link>
                    </Button>
                  </div>
                  <Link
                    href="https://github.com/gfargo/vercel-doorman/tree/main/examples"
                    className="text-slate-600 hover:underline inline-flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    See Example Configurations
                  </Link>
                </div>
              </BoxReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
