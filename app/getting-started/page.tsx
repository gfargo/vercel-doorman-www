import { CopyableCommand } from "@/components/CopyableCommand"
import BoxReveal from "@/components/ui/box-reveal"
import WordPullUp from "@/components/ui/word-pull-up"
import { ChevronRight, InfoIcon } from "lucide-react"
import Link from "next/link"

export default function GettingStarted() {
  return (
    <div>
      <WordPullUp
        words="Getting Started"
        className="text-2xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-4xl md:leading-[5rem]"
      />
      <p className="mt-4 text-gray-600 max-w-2xl">
        Doorman 2.0 introduces multi-provider WAF automation so you can manage Vercel and Cloudflare security policies from the same workflow. Use this guide to get set up today and prepare for the forthcoming Cloudflare release.
      </p>

      <section id="installation" className="mb-16">
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
        <div className="mt-6 rounded-md border border-orange-200 bg-orange-50 p-4 text-sm text-orange-700">
          <p className="font-semibold uppercase tracking-wide text-orange-600">Doorman 2.0 preview</p>
          <p className="mt-2">
            Cloudflare WAF support ships with Doorman 2.0. Install the CLI today and you will be able to target <code>--provider cloudflare</code> as soon as the release is live.
          </p>
        </div>
        <div className="mt-6">
          <BoxReveal boxColor="#f3f3f3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                <strong>Note for Existing Projects:</strong>
              </p>
              <p className="text-blue-700">
                If you have an existing Vercel project with firewall rules,
                start by using the <code>download</code> command to set up your
                local configuration:
              </p>
              <pre className="bg-blue-100 p-2 mt-2 rounded-md font-mono text-sm">
                npx vercel-doorman download
              </pre>
              <p className="mt-2 text-blue-700">
                This will generate a <code>vercel-firewall.config.json</code>{" "}
                file with your existing configuration before you proceed.
              </p>
              <p className="mt-4 text-blue-700">
                When Cloudflare support lands, run{" "}
                <code>npx vercel-doorman download --provider cloudflare</code>{" "}
                to pull your Cloudflare WAF configuration into the same project.
              </p>
            </div>
          </BoxReveal>
        </div>
      </section>

      <section id="basic-usage" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <ol className="list-decimal list-inside space-y-8">
          <li id="configuration">
            <strong>Create or update configuration file:</strong>
            <p className="mt-2">
              Ensure you have a <code>vercel-firewall.config.json</code> file in
              your project root with the following structure:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 font-mono text-sm">
              {`{
  "projectId": "prj_",
  "teamId": "team_",
  "rules": [],
  "ips": []
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
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4 text-sm text-orange-700">
              <p className="font-semibold">Cloudflare configuration (Doorman 2.0)</p>
              <p className="mt-2">
                The upcoming release adds support for Cloudflare accounts and zones. You will be able to extend your config with provider-specific sections without changing the rest of your workflow. Stay tuned for the dedicated Cloudflare quickstart when 2.0 is live.
              </p>
            </div>
          </li>
          <li id="adding-rules" className="scroll-mt-28">
            <strong>Add firewall rules:</strong>
            <p className="mt-2">
              You can add rules in two ways:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-4">
              <li>
                <strong>Using Templates:</strong>
                <p className="mt-1">
                  Use the <code>template</code> command to add predefined rules:
                </p>
                <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
                  {`# List available templates
npx vercel-doorman template

# Add WordPress protection
npx vercel-doorman template wordpress

# Block AI bots
npx vercel-doorman template ai-bots`}
                </pre>
              </li>
              <li>
                <strong>Manual Configuration:</strong>
                <p className="mt-1">
                  Add rules directly to your config file following this structure:
                </p>
                <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm overflow-x-auto">
                  {`{
  "name": "Block API Access",
  "description": "Block access to API endpoints",
  "conditionGroup": [
    {
      "conditions": [
        {
          "type": "path",
          "op": "pre",
          "value": "/api"
        }
      ]
    }
  ],
  "action": {
    "mitigate": {
      "action": "deny",
      "rateLimit": {
        "requests": 100,
        "window": "1m"
      },
      "actionDuration": "1h"
    }
  },
  "active": true
}`}
                </pre>
              </li>
            </ul>
            <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mt-4">
              <p className="font-semibold">Rule Components:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Condition Groups:</strong> Define when rules trigger (AND within groups, OR between groups)</li>
                <li><strong>Conditions:</strong> Match criteria using <code>type</code>, <code>op</code>, and <code>value</code></li>
                <li><strong>Actions:</strong> Define response (<code>deny</code>, <code>challenge</code>, <code>rateLimit</code>, <code>rewrite</code>)</li>
                <li><strong>Metadata:</strong> Rule information (<code>name</code>, <code>description</code>, <code>active</code>)</li>
              </ul>
            </div>
            <p className="mt-4">
              For more examples and templates, visit our{" "}
              <Link
                href="https://github.com/gfargo/vercel-doorman/tree/main/examples"
                className="text-blue-600 hover:underline font-semibold"
              >
                examples folder on GitHub
              </Link>
              .
            </p>
          </li>
          <li id="sync-rules" className="scroll-mt-28">
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
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4 text-sm text-orange-700">
              <p className="font-semibold">Cloudflare sync (preview)</p>
              <p className="mt-2">
                Doorman 2.0 adds{" "}
                <code>npx vercel-doorman sync --provider cloudflare</code> so you can promote Cloudflare WAF changes alongside your Vercel updates.
              </p>
            </div>
          </li>

          <li id="add-script-alias" className="scroll-mt-28">
            <strong>Add script alias (optional):</strong>
            <p className="mt-2">
              To make it easier to run the sync command, add a script alias to
              your <code>package.json</code> file:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 font-mono text-sm">
              {`"scripts": {
    ... other scripts ...
    "firewall:list": "vercel-doorman list",
    "firewall:download": "vercel-doorman download",
    "firewall:sync": "vercel-doorman sync",
    "firewall:validate": "vercel-doorman validate"
}`}
            </pre>
            <p className="mt-2">
              This will allow you to run <code>npm run firewall:sync</code> to
              apply your firewall rules.
            </p>
          </li>
        </ol>
      </section>

      <section id="common-rule-examples" className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Common Rule Examples</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Basic Protection</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/ip-block.json"
                  className="text-blue-600 hover:underline"
                >
                  ip-block.json
                </Link>{" "}
                - Block specific IP addresses
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/path-protection.json"
                  className="text-blue-600 hover:underline"
                >
                  path-protection.json
                </Link>{" "}
                - Secure specific URL paths
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/geo-blocking.json"
                  className="text-blue-600 hover:underline"
                >
                  geo-blocking.json
                </Link>{" "}
                - Country-based access control
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/method-restriction.json"
                  className="text-blue-600 hover:underline"
                >
                  method-restriction.json
                </Link>{" "}
                - Limit HTTP methods
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/rate-limiting.json"
                  className="text-blue-600 hover:underline"
                >
                  rate-limiting.json
                </Link>{" "}
                - Prevent abuse through rate limits
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/redirect-rules.json"
                  className="text-blue-600 hover:underline"
                >
                  redirect-rules.json
                </Link>{" "}
                - Traffic redirection examples
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/challenge-rules.json"
                  className="text-blue-600 hover:underline"
                >
                  challenge-rules.json
                </Link>{" "}
                - Bot prevention with challenges
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/conditional-rules.json"
                  className="text-blue-600 hover:underline"
                >
                  conditional-rules.json
                </Link>{" "}
                - Complex rule combinations
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Specialized Rules</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/user-agent-filtering.json"
                  className="text-blue-600 hover:underline"
                >
                  user-agent-filtering.json
                </Link>{" "}
                - Filter by browser/client type
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/header-based-rules.json"
                  className="text-blue-600 hover:underline"
                >
                  header-based-rules.json
                </Link>{" "}
                - Rules based on HTTP headers
              </li>
              <li>
                <Link
                  href="https://github.com/gfargo/vercel-doorman/blob/main/examples/mixed-rules.json"
                  className="text-blue-600 hover:underline"
                >
                  mixed-rules.json
                </Link>{" "}
                - Multiple protection layers
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="next-steps" className="mb-16">
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
  )
}
