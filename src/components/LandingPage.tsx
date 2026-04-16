export function LandingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          Powered by Claude Code + Figma MCP + Playwright
        </div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Automated QA for your Design System
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Compare what's in <strong className="text-slate-700">Figma</strong> against
          what's live in <strong className="text-slate-700">Storybook</strong>.
          Get a detailed report of every visual inconsistency — colors, spacing, tokens,
          typography, states — in under 2 minutes.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">How it works</h3>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number={1}
              title="Run the command"
              description="Open Claude Code in your terminal and type /qa-design-system. Paste your Figma and Storybook links."
            />
            <StepCard
              number={2}
              title="AI does the work"
              description="Claude reads the Figma specs (tokens, colors, spacing), opens Storybook, and inspects the actual CSS."
            />
            <StepCard
              number={3}
              title="Share the report"
              description="You get a full report in your terminal and a shareable link your team can open in the browser."
            />
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm overflow-x-auto">
          <div className="text-slate-500">$ cd ~/Desktop/qa-tool</div>
          <div className="text-slate-500">$ claude</div>
          <div className="text-slate-400 mt-2">&gt; <span className="text-indigo-400">/qa-design-system</span></div>
          <div className="text-slate-500 mt-2">Paste your Figma URL:</div>
          <div className="text-green-400">https://www.figma.com/design/poaMy.../Unity-DS?node-id=19-3853</div>
          <div className="text-slate-500 mt-1">Paste your Storybook URL:</div>
          <div className="text-green-400">https://unity-components.payfit.io/?path=/docs/component-reference-avatar--docs</div>
          <div className="text-slate-500 mt-3">Extracting Figma specs...</div>
          <div className="text-slate-500">Inspecting Storybook component...</div>
          <div className="text-slate-500">Comparing properties...</div>
          <div className="text-slate-400 mt-3">
            <span className="text-white">Report saved:</span> ./qa-report-avatar.md
          </div>
          <div className="text-slate-400">
            <span className="text-white">Share with your team:</span>{' '}
            <span className="text-indigo-400 underline">https://rafagarces.github.io/qa-tool/?gist=abc123</span>
          </div>
        </div>
      </section>

      {/* What the report covers */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">What the report covers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            title="Visual properties"
            items={['Colors (hex + token names)', 'Typography (font, size, weight)', 'Spacing (padding, gap, margin)', 'Border radius, shadows, opacity']}
          />
          <FeatureCard
            title="Component states"
            items={['Default, hover, focus, active', 'Disabled states', 'All size variants', 'Interactive behavior']}
          />
          <FeatureCard
            title="Token consistency"
            items={['Token vs hardcoded values', 'Cross-state token audit', 'Token naming patterns', 'Library reference checks']}
          />
          <FeatureCard
            title="Accessibility"
            items={['Color contrast (WCAG AA)', 'Focus indicators', 'Keyboard navigation', 'ARIA attributes']}
          />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Issue severity levels</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-base leading-none mt-0.5">&#x1F534;</span>
              <div>
                <div className="font-medium text-slate-800">Critical</div>
                <div className="text-slate-500 text-xs">Broken, missing, or WCAG failure</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base leading-none mt-0.5">&#x1F7E0;</span>
              <div>
                <div className="font-medium text-slate-800">Major</div>
                <div className="text-slate-500 text-xs">Visible discrepancy (&gt;2px, wrong color)</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base leading-none mt-0.5">&#x1F7E1;</span>
              <div>
                <div className="font-medium text-slate-800">Minor</div>
                <div className="text-slate-500 text-xs">Subtle difference (1-2px off)</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base leading-none mt-0.5">&#x26AA;</span>
              <div>
                <div className="font-medium text-slate-800">Note</div>
                <div className="text-slate-500 text-xs">Observation or suggestion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup guide */}
      <section className="space-y-6" id="setup">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Setup guide</h3>
          <p className="text-sm text-slate-500 mt-1">One-time setup. Takes about 10 minutes.</p>
        </div>

        <SetupStep
          number={1}
          title="Install Node.js"
          description="Node.js is needed to run Claude Code."
        >
          <ol className="space-y-2 text-sm text-slate-600">
            <li>Go to <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">nodejs.org</a></li>
            <li>Click the big green <strong>LTS</strong> button to download</li>
            <li>Open the downloaded file and follow the installer</li>
            <li>
              Open <strong>Terminal</strong> (press <Kbd>Cmd</Kbd> + <Kbd>Space</Kbd>, type "Terminal", press Enter)
            </li>
            <li>
              Verify it worked:
              <CodeBlock>node --version</CodeBlock>
              You should see a version number like <code className="bg-slate-100 px-1 rounded text-xs">v22.x.x</code>
            </li>
          </ol>
          <Tip>Already have Node.js? Skip to the next step.</Tip>
        </SetupStep>

        <SetupStep
          number={2}
          title="Install Claude Code"
          description="Claude Code is Anthropic's AI tool for the terminal. You need a Max or Team plan."
        >
          <ol className="space-y-2 text-sm text-slate-600">
            <li>
              In Terminal, paste this and press Enter:
              <CodeBlock>npm install -g @anthropic-ai/claude-code</CodeBlock>
            </li>
            <li>
              Verify it worked:
              <CodeBlock>claude --version</CodeBlock>
            </li>
            <li>
              Log in for the first time:
              <CodeBlock>claude</CodeBlock>
              A browser window opens. Sign in with your Anthropic account and follow the prompts.
            </li>
          </ol>
        </SetupStep>

        <SetupStep
          number={3}
          title="Install the Figma plugin"
          description="Lets Claude Code read designs from your Figma files."
        >
          <ol className="space-y-2 text-sm text-slate-600">
            <li>
              Open Claude Code (type <code className="bg-slate-100 px-1 rounded text-xs">claude</code> in Terminal)
            </li>
            <li>
              Type this command:
              <CodeBlock>/install-plugin figma</CodeBlock>
            </li>
            <li>Follow the prompts to connect your Figma account</li>
          </ol>
          <Tip>
            If that doesn't work: go to{' '}
            <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
              Figma &rarr; Settings &rarr; Personal Access Tokens
            </a>, create a token, then in Claude Code type <code className="bg-slate-100 px-1 rounded text-xs">/config</code> and add it as <code className="bg-slate-100 px-1 rounded text-xs">FIGMA_API_TOKEN</code>.
          </Tip>
        </SetupStep>

        <SetupStep
          number={4}
          title="Install the Playwright plugin"
          description="Lets Claude Code open web pages and inspect CSS (for Storybook)."
        >
          <ol className="space-y-2 text-sm text-slate-600">
            <li>
              Inside Claude Code, type:
              <CodeBlock>/install-plugin playwright</CodeBlock>
            </li>
          </ol>
        </SetupStep>

        <SetupStep
          number={5}
          title="Install the GitHub CLI"
          description="Needed to create shareable report links."
        >
          <ol className="space-y-2 text-sm text-slate-600">
            <li>
              Exit Claude Code first (press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>)
            </li>
            <li>
              Install Homebrew (Mac package manager) if you don't have it:
              <CodeBlock>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</CodeBlock>
            </li>
            <li>
              Install the GitHub CLI:
              <CodeBlock>brew install gh</CodeBlock>
            </li>
            <li>
              Log in to GitHub:
              <CodeBlock>gh auth login</CodeBlock>
              When asked, choose: <strong>GitHub.com</strong> &rarr; <strong>HTTPS</strong> &rarr; <strong>Login with a web browser</strong>
            </li>
          </ol>
          <Tip>Already have <code className="bg-slate-100 px-1 rounded text-xs">gh</code> installed? Just make sure you're logged in with <code className="bg-slate-100 px-1 rounded text-xs">gh auth status</code>.</Tip>
        </SetupStep>

        <SetupStep
          number={6}
          title="Clone this repo"
          description="This gives you the QA skill. No extra install needed."
          last
        >
          <ol className="space-y-2 text-sm text-slate-600">
            <li>
              In Terminal:
              <CodeBlock>cd ~/Desktop{'\n'}git clone https://github.com/rafagarces/qa-tool.git</CodeBlock>
            </li>
          </ol>
          <Tip>
            Don't have git? Run <code className="bg-slate-100 px-1 rounded text-xs">xcode-select --install</code> first.
          </Tip>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
            Done! The <code className="bg-green-100 px-1 rounded text-xs">/qa-design-system</code> skill is bundled in the repo and will be available automatically.
          </div>
        </SetupStep>
      </section>

      {/* Quick reference */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Quick reference</h3>
        <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm space-y-1">
          <div className="text-slate-500"># Every time you want to run a QA check:</div>
          <div className="text-slate-300">cd ~/Desktop/qa-tool</div>
          <div className="text-slate-300">claude</div>
          <div className="text-indigo-400 mt-1">/qa-design-system</div>
          <div className="text-slate-500 mt-2"># Then paste your Figma URL and Storybook URL when asked</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-8 pb-4 text-center text-xs text-slate-400">
        Built with Claude Code &middot;{' '}
        <a
          href="https://github.com/rafagarces/qa-tool"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline"
        >
          Source on GitHub
        </a>
      </footer>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center space-y-2">
      <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-lg font-bold mx-auto">
        {number}
      </div>
      <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function FeatureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <h4 className="text-sm font-semibold text-slate-800 mb-2">{title}</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-500 flex items-start gap-2">
            <span className="text-indigo-400 mt-1 text-xs">&#9679;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SetupStep({
  number,
  title,
  description,
  children,
  last,
}: {
  number: number
  title: string
  description: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </div>
        {!last && <div className="w-px flex-1 bg-slate-200 mt-2" />}
      </div>
      <div className="pb-8 flex-1">
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500 mb-3">{description}</p>
        {children}
      </div>
    </div>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-slate-900 text-slate-200 rounded-lg px-4 py-2.5 my-2 text-xs font-mono overflow-x-auto whitespace-pre">
      {children}
    </pre>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono text-slate-700">
      {children}
    </kbd>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
      <strong>Tip:</strong> {children}
    </div>
  )
}
