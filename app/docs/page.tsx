import Link from "next/link";

export default function Docs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Docs</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="#introduction"
              className="text-blue-600 hover:underline"
            >
              Introduction
            </Link>
          </li>
          <li>
            <Link
              href="#installation"
              className="text-blue-600 hover:underline"
            >
              Installation
            </Link>
          </li>
          <li>
            <Link
              href="#configuration"
              className="text-blue-600 hover:underline"
            >
              Configuration
            </Link>
          </li>
          <li>
            <Link
              href="#environment-variables"
              className="text-blue-600 hover:underline"
            >
              Environment Variables
            </Link>
          </li>
          <li>
            <Link
              href="#commands"
              className="text-blue-600 hover:underline"
            >
              Commands
            </Link>
          </li>
          <li>
            <Link
              href="#examples"
              className="text-blue-600 hover:underline"
            >
              Examples
            </Link>
          </li>
        </ul>
      </section>

      <section
        id="introduction"
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Vercel Doorman is a powerful tool for managing Vercel Firewall rules
          as code. It enables version control and automated deployment of your
          project's security configuration.
        </p>
      </section>

      <section
        id="installation"
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p>
          To install Vercel Doorman, please refer to our{" "}
          <Link
            href="/getting-started"
            className="text-blue-600 hover:underline"
          >
            Getting Started
          </Link>{" "}
          guide.
        </p>
      </section>

      <section
        id="configuration"
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
        <p>
          Vercel Doorman uses a <code>vercel-firewall.config.json</code> file to
          define your firewall rules. Create this file in your project root with
          the following structure:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 font-mono text-sm">
          {`{
  "projectId": "prj_...",
  "teamId": "team_...",
  "rules": [
    {
      "type": "country",
      "action": "block",
      "countries": ["US", "CA"]
    },
    {
      "type": "ip",
      "action": "allow",
      "ip": "203.0.113.0"
    }
  ]
}`}
        </pre>
        <p className="mt-4">
          Replace <code>prj_...</code> and <code>team_...</code> with your
          actual Vercel project and team IDs. The <code>rules</code> array
          contains your firewall rules. For more examples, see the{" "}
          <Link
            href="#examples"
            className="text-blue-600 hover:underline"
          >
            Examples
          </Link>{" "}
          section below.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 mt-6">
          <p className=" text-blue-700">
            If you have a pre-existing firewall configuration for your Vercel
            project, we recommend using the <code>download</code> command to get
            started. This will fetch your current rules and create a local{" "}
            <code>vercel-firewall.config.json</code> file.
          </p>
        </div>
      </section>

      <section
        id="environment-variables"
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
        <p>
          Vercel Doorman can use environment variables stored in a{" "}
          <code>.env</code> file in your project root. This allows you to
          securely manage your Vercel API token and project/team IDs without
          hardcoding them in your configuration or commands.
        </p>
        <p className="mt-4">
          Create a <code>.env</code> file in your project root with the
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
          <strong>Note:</strong> Make sure to add <code>.env</code> to your{" "}
          <code>.gitignore</code> file to prevent sensitive information from
          being committed to your repository.
        </p>
      </section>

      <section
        id="commands"
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Commands</h2>
        <ul className="space-y-4">
          <li>
            <strong>sync</strong>: Synchronize your local configuration with
            Vercel
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              npx vercel-doorman sync
            </pre>
          </li>
          <li>
            <strong>list</strong>: List current firewall rules
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              npx vercel-doorman list
            </pre>
          </li>
          <li>
            <strong>download</strong>: Download existing firewall rules from
            Vercel
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              npx vercel-doorman download
            </pre>
            <p className="mt-2">
              Use this command to get started with an existing Vercel firewall
              configuration.
            </p>
          </li>
          <li>
            <strong>validate</strong>: Validate your local
            vercel-firewall.config.json file
            <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
              npx vercel-doorman validate
            </pre>
            <p className="mt-2">
              This command checks your local configuration file for errors
              before you sync it with Vercel.
            </p>
          </li>
        </ul>
        <p className="mt-4">
          <strong className='mr-1'>Authentication Token:</strong>
          If you haven&apos;t set up environment variables, you can also pass the
          Vercel API token directly in the command using the{" "}
          <code>--token</code> flag:
        </p>
        <pre className="bg-gray-100 p-2 rounded-md mt-2 font-mono text-sm">
          npx vercel-doorman sync --token YOUR_VERCEL_API_TOKEN
        </pre>
      </section>

      <section
        id="examples"
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <p className="mb-4">
          We provide a variety of example configurations to help you get
          started. You can find these in our{" "}
          <Link
            href="https://github.com/gfargo/vercel-doorman/tree/main/examples"
            className="text-blue-600 hover:underline"
          >
            examples folder on GitHub
          </Link>
          .
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
