import { CopyableCommand } from "@/components/CopyableCommand";
import { ChevronRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export default function GettingStarted() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Getting Started</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="mb-4">
          To get started with Vercel Doorman, first install it using your
          preferred package manager:
        </p>
        <CopyableCommand
          command={[
            { value: "npm", command: "npm install vercel-doorman" },
            { value: "yarn", command: "yarn add vercel-doorman" },
            { value: "pnpm", command: "pnpm add vercel-doorman" },
            { value: "bun", command: "bun add vercel-doorman" },
          ]}
        />
        <div className="mt-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-700">
              <strong>Note for Existing Projects:</strong>
            </p>
            <p className="text-blue-700">
              If you have an existing Vercel project with firewall rules, start
              by using the <code>download</code> command to set up your local
              configuration:
            </p>
            <pre className="bg-blue-100 p-2 mt-2 rounded-md font-mono text-sm">
              npx vercel-doorman download --token YOUR_VERCEL_API_TOKEN
            </pre>
            <p className="mt-2 text-blue-700">
              This will generate a <code>vercel-firewall.config.json</code> file
              with your existing configuration before you proceed.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <ol className="list-decimal list-inside space-y-8">
          <li>
            <strong>Create or update configuration file:</strong>
            <p className="mt-2">
              Ensure you have a <code>vercel-firewall.config.json</code> file in
              your project root with the following structure:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 font-mono text-sm">
              {`{
  "projectId": "prj_",
  "teamId": "team_",
  "rules": [ ... your rules here ... ]
}`}
            </pre>
            <p className="mt-2">
              Replace <code>prj_</code> and <code>team_</code> with your actual
              <Link
                href="https://vercel.com/docs/projects/project-configuration/general-settings#project-id"
                className="text-blue-600 hover:underline mx-1 font-semibold"
              >
                projectId
              </Link>
              and
              <Link
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                className="text-blue-600 hover:underline ml-1 font-semibold"
              >
                teamId
              </Link>{" "}
              from Vercel.
            </p>
          </li>
          <li>
            <strong>Configure your firewall rules:</strong>
            <p>
              Edit the <code>rules</code> array in your{" "}
              <code>vercel-firewall.config.json</code> file to define your
              firewall rules.
            </p>
            <p className="mt-2">
              For example configurations, visit our{" "}
              <Link
                href="https://github.com/gfargo/vercel-doorman/tree/main/examples"
                className="text-blue-600 hover:underline font-semibold"
              >
                examples folder on GitHub
              </Link>
              .
            </p>
          </li>
          <li>
            <strong>Sync your rules:</strong>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 font-mono text-sm">
              npx vercel-doorman sync --token YOUR_VERCEL_API_TOKEN
            </pre>
            <p className="mt-2">
              This will apply your firewall rules to your Vercel project.
              Replace <code>YOUR_VERCEL_API_TOKEN</code> with your actual Vercel
              API token.
            </p>
            <p className="mt-2">
              <Link
                href="https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token"
                className="text-blue-600 hover:underline flex items-center font-semibold"
              >
                <InfoIcon className="w-4 h-4 inline-block mr-1 " />
                Learn how to create and use a Vercel API token
              </Link>
            </p>
          </li>

          <li>
            <strong>Add script alias (optional):</strong>
            <p className="mt-2">
              To make it easier to run the sync command, add a script alias to
              your <code>package.json</code> file:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 font-mono text-sm">
              {`"scripts": {
    ... other scripts ...
    "firewall:list": "vercel-doorman list --token YOUR_VERCEL_API_TOKEN",
    "firewall:sync": "vercel-doorman sync --token YOUR_VERCEL_API_TOKEN",
    "firewall:download": "vercel-doorman download --token YOUR_VERCEL_API_TOKEN"
}`}
            </pre>
            <p className="mt-2">
              This will allow you to run <code>npm run firewall:sync</code> to
              apply your firewall rules.
            </p>
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Rule Examples</h2>
        <p className="mb-4">
          Here are some common rule configurations you might find useful:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>IP Blocking:</strong>{" "}
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/ip-block.json"
              className="text-blue-600 hover:underline"
            >
              ip-block.json
            </Link>{" "}
            - Basic IP address blocking
          </li>
          <li>
            <strong>Path Protection:</strong>{" "}
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/path-protection.json"
              className="text-blue-600 hover:underline"
            >
              path-protection.json
            </Link>{" "}
            - Path-based access control
          </li>
          <li>
            <strong>Geo-blocking:</strong>{" "}
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/geo-blocking.json"
              className="text-blue-600 hover:underline"
            >
              geo-blocking.json
            </Link>{" "}
            - Geographic location based rules
          </li>
          <li>
            <strong>Method Restriction:</strong>{" "}
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/method-restriction.json"
              className="text-blue-600 hover:underline"
            >
              method-restriction.json
            </Link>{" "}
            - HTTP method restrictions
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/docs"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Read the full documentation{" "}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/tree/main/examples"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Explore more example configurations{" "}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Contribute on GitHub <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
