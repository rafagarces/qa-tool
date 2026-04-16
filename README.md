# Design System QA Tool

Compare Figma designs against Storybook implementations and share formatted reports with your team.

**Live report viewer:** https://rafagarces.github.io/qa-tool/

---

## How it works

```
You (Claude Code terminal)                    Your team (browser)
                                              
  /qa-design-system                           rafagarces.github.io/qa-tool/?gist=abc123
  + Figma URL                                 
  + Storybook URL                             ┌─────────────────────────┐
          │                                   │ Avatar — QA Report      │
          ▼                                   │ 🔴 0  🟠 2  🟡 2  ⚪ 1  │
  Figma MCP extracts design specs ──┐         │                         │
  Playwright inspects Storybook CSS ├── 🔗 ──▶│ Issues, token matrix,   │
  Claude compares everything ───────┘         │ accessibility check...  │
          │                                   └─────────────────────────┘
          ▼
  Report in terminal + shareable link
```

1. You run `/qa-design-system` in Claude Code
2. It extracts specs from Figma and inspects the live Storybook component
3. Claude compares everything and generates a detailed QA report
4. The report is published as a GitHub Gist with a shareable link
5. Anyone on your team can open the link — no install needed

---

## Setup guide (for designers)

This is a one-time setup. Once done, running a QA check takes about 30 seconds.

### Step 1: Install Claude Code

Claude Code is a terminal tool made by Anthropic. You need a paid plan (Max or Team).

**On Mac:**

Open Terminal (press `Cmd + Space`, type "Terminal", press Enter) and paste this command:

```bash
npm install -g @anthropic-ai/claude-code
```

> **Don't have npm?** Install Node.js first:
> 1. Go to https://nodejs.org
> 2. Download the **LTS** version (the big green button)
> 3. Open the downloaded file and follow the installer
> 4. Close Terminal and open it again
> 5. Now try the command above again

Check it worked — paste this and press Enter:

```bash
claude --version
```

You should see something like `2.1.72`.

### Step 2: Log in to Claude Code

In Terminal, type:

```bash
claude
```

A browser window will open. Log in with your Anthropic account and follow the prompts. Once done, you'll see the Claude Code prompt in your terminal.

### Step 3: Install the Figma plugin

This lets Claude Code read your Figma designs. **Inside Claude Code** (you should see a `>` prompt), type:

```
/install-plugin figma
```

Follow the prompts. It will connect to your Figma account.

> **If that doesn't work**, you can set it up manually:
> 1. Go to https://www.figma.com/developers/api#access-tokens
> 2. Click "Create a new personal access token"
> 3. Copy the token
> 4. In Claude Code, type `/config`
> 5. Add your token as `FIGMA_API_TOKEN`

### Step 4: Install the Playwright plugin

This lets Claude Code open and inspect web pages (your Storybook). **Inside Claude Code**, type:

```
/install-plugin playwright
```

### Step 5: Install the GitHub CLI

This is needed to create shareable report links. **In Terminal** (not inside Claude Code — press `Ctrl+C` to exit Claude Code first if needed):

```bash
brew install gh
```

> **Don't have Homebrew?** 
> 1. Go to https://brew.sh
> 2. Copy the command shown on that page
> 3. Paste it in Terminal and press Enter
> 4. Follow the prompts (it may ask for your Mac password)
> 5. Then try `brew install gh` again

Log in to GitHub:

```bash
gh auth login
```

Choose these options when asked:
- **Where do you use GitHub?** → GitHub.com
- **Protocol** → HTTPS
- **Authenticate** → Login with a web browser

Follow the browser prompts to finish.

### Step 6: Clone this repo

This gives you the QA skill automatically — no extra install needed.

```bash
cd ~/Desktop
git clone https://github.com/rafagarces/qa-tool.git
```

> **Don't have git?** If you see "command not found", run `xcode-select --install` first, then try again.

That's it! The `/qa-design-system` skill is bundled inside the repo at `.claude/skills/`.

---

## Running a QA check

### 1. Open Claude Code in the repo folder

```bash
cd ~/Desktop/qa-tool
claude
```

> **Important:** You must be inside the `qa-tool` folder for the skill to be available. If you open Claude Code from a different folder, it won't find the skill.

### 2. Run the skill

Type:

```
/qa-design-system
```

### 3. Provide the links

Claude will ask for two URLs. Here's how to get them:

**Figma URL:**
1. Open the component in Figma
2. Right-click on the component frame
3. Click **"Copy/Paste as"** → **"Copy link"**
4. Paste it into Claude Code

Example: `https://www.figma.com/design/poaMyU7abAgL9VRhx4ygyy/Unity-DS-Components-Library?node-id=19-3853`

**Storybook URL:**
1. Open the component page in Storybook in your browser
2. Copy the URL from the address bar
3. Paste it into Claude Code

Example: `https://unity-components.payfit.io/?path=/docs/component-reference-avatar--docs`

### 4. Wait for the analysis

Claude will:
- Extract all design specs from Figma (dimensions, colors, tokens, variants)
- Open Storybook in a browser and inspect the actual CSS
- Compare everything and flag discrepancies

This takes 1-2 minutes. You'll see progress in the terminal.

### 5. Get your results

You'll see the full report in your terminal, plus:

```
📄 Report saved: ./qa-report-avatar.md
🔗 Share with your team: https://rafagarces.github.io/qa-tool/?gist=abc123def456
```

**Send that link to anyone** — they'll see the formatted report in their browser. No setup needed on their end.

---

## Viewing reports (no setup needed)

If someone sends you a QA report link, just **click it**. It opens in your browser:

```
https://rafagarces.github.io/qa-tool/?gist=abc123def456
```

You can also go to https://rafagarces.github.io/qa-tool/ and:
- **Paste** a report's markdown text
- **Upload** a `.md` file
- **Load an example** to see what reports look like

---

## What the report includes

| Section | Description |
|---------|-------------|
| **Summary** | Total issues by severity (Critical, Major, Minor, Notes) |
| **Issues** | Each discrepancy with exact Figma vs Storybook values |
| **Accessibility check** | WCAG contrast, focus indicators, keyboard access |
| **Token consistency matrix** | Side-by-side token comparison across all states |
| **Property checklist** | Which properties were compared across which variants |

### Severity levels

| Icon | Level | Meaning |
|------|-------|---------|
| 🔴 | Critical | Broken functionality, missing variant, WCAG failure |
| 🟠 | Major | Wrong color, spacing > 2px off, wrong font-weight |
| 🟡 | Minor | 1-2px off, slight opacity mismatch |
| ⚪ | Note | Observations and suggestions |

---

## Troubleshooting

**"Command not found: claude"**
- Run `npm install -g @anthropic-ai/claude-code`
- Close and reopen Terminal, then try again

**"Command not found: gh"**
- Run `brew install gh`, then `gh auth login`

**"Command not found: npm"**
- Install Node.js from https://nodejs.org (click the LTS button)
- Close and reopen Terminal

**"Command not found: brew"**
- Go to https://brew.sh and follow the install instructions

**"Command not found: git"**
- Run `xcode-select --install` and follow the prompts

**Figma extraction fails**
- Make sure the Figma desktop app is open with the file
- Try `/install-plugin figma` again inside Claude Code

**Storybook inspection fails**
- Make sure the Storybook URL works in your browser first
- Try `/install-plugin playwright` again inside Claude Code

**"/qa-design-system" not found**
- Make sure you're running Claude Code from inside the `qa-tool` folder:
  ```bash
  cd ~/Desktop/qa-tool
  claude
  ```

---

## Development

Source code for the report viewer web app.

```bash
npm install
npm run dev     # Start dev server at localhost:5174
npm run build   # Production build
```

Deploys automatically to GitHub Pages on push to `main`.
