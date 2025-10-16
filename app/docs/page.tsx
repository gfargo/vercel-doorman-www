import WordPullUp from "@/components/ui/word-pull-up";
import {
  GitHubLogoIcon,
  Link1Icon,
  VercelLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Docs() {
  return (
    <div className="">
      <WordPullUp
        words="Docs"
        className="text-2xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-4xl md:leading-[5rem]"
      />

      <section
        id="introduction"
        className="mb-16 scroll-mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Vercel Doorman 2.0 is a powerful tool for managing Vercel and Cloudflare WAF rules as code. It enables version control and automated deployment of your project's security configuration across providers.
        </p>
        <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-4 text-sm text-orange-700">
          <p className="font-semibold uppercase tracking-wide text-orange-600">
            Cloudflare support
          </p>
          <p className="mt-2">
            Cloudflare integration lands with the Doorman 2.0 release. The rest of this guide walks through the existing Vercel workflow so you can get set up ahead of launch.
          </p>
        </div>
      </section>

      <section
        id="installation"
        className="mb-16 scroll-mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p>
          To install Vercel Doorman, please refer to our{" "}
          <Link
            href="/getting-started"
            className="text-blue-600 hover:underline font-semibold"
          >
            Getting Started
          </Link>{" "}
          guide.
        </p>
      </section>

      <section
        id="configuration"
        className="mb-16 scroll-mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
        <p>
          Vercel Doorman uses a{" "}
          <code className="bg-gray-50 p-1 rounded-md border border-solid select-all ">
            vercel-firewall.config.json
          </code>{" "}
          config file in your project root to define your firewall rules.
        </p>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 font-mono text-sm">
          {`{
  "projectId": "prj_...",
  "teamId": "team_...",
  "rules": [
    {
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
    }
  ],
  "ips": []
}`}
        </pre>
        <p className="mt-4">
          Replace <code>prj_...</code> and <code>team_...</code> with your
          actual Vercel project and team IDs. The <code>rules</code> array
          contains your firewall rules. For more examples, see the{" "}
          <Link
            href="#examples"
            className="text-blue-600 hover:underline font-semibold"
          >
            Examples
          </Link>{" "}
          section below.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 mt-6">
          <p className=" text-blue-700">
            💬 If you have a pre-existing{" "}
            <VercelLogoIcon className="inline-block" /> firewall, we recommend
            using the{" "}
            <code className="bg-gray-50 p-1 rounded-md border border-solid">
              download
            </code>{" "}
            command to get started...
          </p>
          <p className="text-blue-700 text-xs mt-4 leading-loose md:leading-normal">
            Fetches your current rules and creates/updates a local{" "}
            <code className="bg-gray-50 p-1 rounded-md border border-solid select-all">
              vercel-firewall.config.json
            </code>{" "}
            file.
          </p>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 text-sm text-orange-700">
          <p className="font-semibold">Cloudflare configuration (Doorman 2.0)</p>
          <p className="mt-2">
            Cloudflare accounts and zones will be supported with the 2.0 launch. Configuration examples and schema updates will be added here as soon as the release ships.
          </p>
        </div>
      </section>

      <section
        id="environment-variables"
        className="mb-16 scroll-mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
        <p>
          Variables can be provided in any way that makes them available in the
          current environment, such as through a{" "}
          <code className="bg-gray-50 p-1 rounded-md border border-solid">
            .env
          </code>{" "}
          file, shell exports, or CI/CD environment settings.
        </p>
        <p className="mt-4">
          If you prefer to use a{" "}
          <code className="bg-gray-50 p-1 rounded-md border border-solid">
            .env
          </code>{" "}
          file, you can create one in your project's root directory with the
          following content:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 font-mono text-sm">
          {`VERCEL_TOKEN=your_vercel_api_token
VERCEL_PROJECT_ID=your_project_id
VERCEL_TEAM_ID=your_team_id`}
        </pre>

        <p className="mt-4">
          Replace the values with your actual Vercel API token, project ID, and
          team ID. When these environment variables are set, you don't need to
          include them in your commands or configuration file.
        </p>
        <p className="mt-4">
          <strong>Note:</strong> Make sure to add{" "}
          <code className="bg-gray-50 p-1 rounded-md border border-solid">
            .env
          </code>{" "}
          to your{" "}
          <code className="bg-gray-50 p-1 rounded-md border border-solid">
            .gitignore
          </code>{" "}
          file to prevent sensitive information from being committed to your
          repository.
        </p>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-6 text-sm text-orange-700">
          <p className="font-semibold">Cloudflare environment variables</p>
          <p className="mt-2">
            Cloudflare token, account, and zone environment variables will be listed here when Doorman 2.0 is released.
          </p>
        </div>
      </section>

      <section
        id="commands"
        className="mb-16 scroll-mt-16"
      >
        <h2
          className="text-2xl font-semibold mb-4"
          id="commands-heading"
        >
          Commands
        </h2>
        <ul className="space-y-4">
          <li id="commands-list">
            <strong className="text-2xl md:text-4xl mr-3 opacity-40">
              list
            </strong>{" "}
            List firewall rules, either the current active configuration or a
            specific version
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              {`# List current active rules
npx vercel-doorman list

# List rules from a specific version
npx vercel-doorman list 1

# List specific version in JSON format
npx vercel-doorman list 2 --format json`}
            </pre>
          </li>
          <li
            id="commands-sync"
            className="scroll-mt-28"
          >
            <strong className="text-2xl md:text-4xl mr-3 opacity-40">
              sync
            </strong>{" "}
            Synchronize your local configuration with Vercel
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              npx vercel-doorman sync --token YOUR_TOKEN
            </pre>
            <div className="mt-2">
              <i className="opacity-45">Options:</i>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <code>--config, -c</code>: Path to config file
                </li>
                <li>
                  <code>--projectId, -p</code>: Vercel Project ID
                </li>
                <li>
                  <code>--teamId, -t</code>: Vercel Team ID
                </li>
                <li>
                  <code>--token</code>: Vercel API token
                </li>
                <li>
                  <code>--provider</code>: Target provider (Cloudflare support lands with Doorman 2.0)
                </li>
              </ul>
            </div>
          </li>
          <li
            id="commands-download"
            className="scroll-mt-28"
          >
            <strong className="text-2xl md:text-4xl mr-3 opacity-40">
              download
            </strong>{" "}
            Download firewall rules from your Vercel project
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              {`# Preview changes without modifying config
npx vercel-doorman download --dry-run

# Download and update config
npx vercel-doorman download

# Download specific version
npx vercel-doorman download 1`}
            </pre>
            <div className="mt-2">
              <i className="opacity-45">Options:</i>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <code>configVersion</code>: Optional version number
                </li>
                <li>
                  <code>--dry-run, -d</code>: Preview changes
                </li>
                <li>
                  <code>--config, -c</code>: Path to config file
                </li>
                <li>
                  <code>--token</code>: Vercel API token
                </li>
                <li>
                  <code>--provider</code>: Target provider (Cloudflare download support arrives with Doorman 2.0)
                </li>
              </ul>
            </div>
          </li>
          <li
            id="commands-template"
            className="scroll-mt-28"
          >
            <strong className="text-2xl md:text-4xl mr-3 opacity-40">
              template
            </strong>{" "}
            Add predefined rule templates to your configuration
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              {` # List available templates
npx vercel-doorman template

# Add specific template
npx vercel-doorman template wordpress`}
            </pre>
            <div className="mt-2">
              <p className="w-full flex items-center gap-2">
                <span className="italic">Available Templates</span>{" "}
                <Link
                  href={
                    "https://github.com/gfargo/vercel-doorman/tree/main/src/lib/templates"
                  }
                >
                  <Link1Icon />
                </Link>
              </p>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <code>bad-bots</code>: Block common malicious bot traffic
                </li>
                <li>
                  <code>ai-bots</code>: Block AI crawlers and scrapers
                </li>
                <li>
                  <code>wordpress</code>: Block WordPress-related URLs
                </li>
                <li>
                  <code>block-ofac-sanctioned-countries</code>: OFAC compliance
                </li>
              </ul>
            </div>
          </li>
          <li
            id="commands-validate"
            className="scroll-mt-28"
          >
            <strong className="text-2xl md:text-4xl mr-3 opacity-40">
              validate
            </strong>{" "}
            Validate your configuration file
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              {`npx vercel-doorman validate

# Show detailed validation results
npx vercel-doorman validate --verbose`}
            </pre>
            <div className="mt-2">
              <i className="opacity-45">Options:</i>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <code>--config, -c</code>: Path to config file
                </li>
                <li>
                  <code>--verbose, -v</code>: Show detailed results
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mt-6">
          <p className="font-semibold">Environment Variables</p>
          <p className="mt-2">
            Instead of passing command-line arguments, you can set these
            environment variables:
          </p>
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>
              <code>VERCEL_TOKEN</code>: Your Vercel API token
            </li>
            <li>
              <code>VERCEL_PROJECT_ID</code>: Your Vercel project ID
            </li>
            <li>
              <code>VERCEL_TEAM_ID</code>: Your Vercel team ID
            </li>
          </ul>
        </div>
      </section>

      <section
        id="examples"
        className="mb-16 scroll-mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <p className="mb-4">
          We provide a variety of{" "}
          <Link
            href="https://github.com/gfargo/vercel-doorman/tree/main/examples"
            className="text-blue-600 hover:underline font-semibold"
          >
            example configurations
          </Link>{" "}
          on <GitHubLogoIcon className="w-4 h-4 inline-block" /> to help you get
          started.
        </p>
        <h3 className="text-xl font-semibold mb-2">Basic Rules</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/ip-block.json"
              className="text-blue-600 hover:underline"
            >
              ip-block.json
            </Link>{" "}
            - Basic IP address blocking
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/path-protection.json"
              className="text-blue-600 hover:underline"
            >
              path-protection.json
            </Link>{" "}
            - Path-based access control
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/geo-blocking.json"
              className="text-blue-600 hover:underline"
            >
              geo-blocking.json
            </Link>{" "}
            - Geographic location based rules
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/method-restriction.json"
              className="text-blue-600 hover:underline"
            >
              method-restriction.json
            </Link>{" "}
            - HTTP method restrictions
          </li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Advanced Rules</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/rate-limiting.json"
              className="text-blue-600 hover:underline"
            >
              rate-limiting.json
            </Link>{" "}
            - Rate limiting examples
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/redirect-rules.json"
              className="text-blue-600 hover:underline"
            >
              redirect-rules.json
            </Link>{" "}
            - Redirection configurations
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/challenge-rules.json"
              className="text-blue-600 hover:underline"
            >
              challenge-rules.json
            </Link>{" "}
            - Browser challenge examples
          </li>
          <li>
            <Link
              href="https://github.com/gfargo/vercel-doorman/blob/main/examples/conditional-rules.json"
              className="text-blue-600 hover:underline"
            >
              conditional-rules.json
            </Link>{" "}
            - Complex condition group examples
          </li>
        </ul>
      </section>
    </div>
  );
}
