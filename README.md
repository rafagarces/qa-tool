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

Claude Code is a terminal tool made by Anthropic. You need a paid plan.

**On Mac:**

Open Terminal (press `Cmd + Space`, type "Terminal", press Enter) and paste:

```bash
npm install -g @anthropic-ai/claude-code
```

> **Don't have npm?** Install Node.js first from https://nodejs.org (download the LTS version, run the installer, then try the command above again).

Verify it worked:

```bash
claude --version
```

You should see a version number like `2.x.x`.

**First-time login:**

```bash
claude
```

This opens a browser window to log in with your Anthropic account. Follow the prompts.

### Step 2: Install the Figma plugin

This lets Claude Code read your Figma designs. Inside Claude Code, type:

```
/install-plugin figma
```

Follow the prompts. It will ask you to connect your Figma account.

> **Alternative:** If that doesn't work, you can set it up manually by adding a Figma personal access token. Go to https://www.figma.com/developers/api#access-tokens, create a token, then in Claude Code type:
> ```
> /config
> ```
> And add your token under environment variables as `FIGMA_API_TOKEN`.

### Step 3: Install the Playwright plugin

This lets Claude Code open and inspect web pages (your Storybook). Inside Claude Code, type:

```
/install-plugin playwright
```

### Step 4: Install the GitHub CLI

This is needed to create shareable links. In your terminal (not Claude Code):

**On Mac:**

```bash
brew install gh
```

> **Don't have Homebrew?** Install it from https://brew.sh (paste the command shown on that page into Terminal).

Then log in:

```bash
gh auth login
```

Choose "GitHub.com", then "HTTPS", then follow the browser prompts.

### Step 5: Install the QA skill

This is the actual QA tool. In your terminal:

```bash
mkdir -p ~/.claude/skills/qa-design-system
curl -o ~/.claude/skills/qa-design-system/SKILL.md https://raw.githubusercontent.com/rafagarces/qa-tool/main/skill/SKILL.md
```

> **Alternative (manual):** Create the folder `~/.claude/skills/qa-design-system/` and copy the `SKILL.md` file from this repo's `skill/` folder into it.

---

## Running a QA check

### 1. Open Claude Code

```bash
claude
```

### 2. Run the skill

Type:

```
/qa-design-system
```

### 3. Provide the links

Claude will ask for two URLs. Paste them one at a time:

- **Figma component URL** — Right-click a component in Figma, choose "Copy link to selection"
  
  Example: `https://www.figma.com/design/poaMyU7abAgL9VRhx4ygyy/Unity-DS-Components-Library?node-id=19-3853`

- **Storybook component URL** — Open the component in Storybook and copy the URL from your browser
  
  Example: `https://unity-components.payfit.io/?path=/docs/component-reference-avatar--docs`

### 4. Wait for the analysis

Claude will:
- Extract all design specs from Figma (dimensions, colors, tokens, variants)
- Open Storybook in a browser and inspect the actual CSS
- Compare everything and flag discrepancies

This takes 1-2 minutes.

### 5. Get your results

You'll see:
- The full report right in your terminal
- A saved `.md` file in your current folder
- A shareable link like:

```
📄 Report saved: ./qa-report-avatar.md
🔗 Share with your team: https://rafagarces.github.io/qa-tool/?gist=abc123def456
```

Send that link to anyone — they'll see the formatted report in their browser, no setup needed.

---

## Viewing reports (no install needed)

If someone sends you a QA report link, just open it in your browser:

```
https://rafagarces.github.io/qa-tool/?gist=GIST_ID
```

You can also go to https://rafagarces.github.io/qa-tool/ and:
- **Paste** markdown directly
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
- Make sure you installed Claude Code: `npm install -g @anthropic-ai/claude-code`
- Close and reopen Terminal, then try again

**"Command not found: gh"**
- Install GitHub CLI: `brew install gh`
- Then log in: `gh auth login`

**"Command not found: npm"**
- Install Node.js from https://nodejs.org (LTS version)

**Figma extraction fails**
- Make sure Figma desktop app is open with the file
- Try running `/install-plugin figma` again in Claude Code

**Storybook inspection fails**
- Make sure the Storybook URL is accessible (try opening it in your browser first)
- Try running `/install-plugin playwright` again in Claude Code

**"Skill not found" when typing /qa-design-system**
- Re-run the install command from Step 5 above
- Make sure the file exists: `ls ~/.claude/skills/qa-design-system/SKILL.md`

---

## Development

This is the source code for the report viewer web app.

```bash
npm install
npm run dev     # Start dev server at localhost:5174
npm run build   # Production build to dist/
```

Deploys automatically to GitHub Pages on push to `main`.
