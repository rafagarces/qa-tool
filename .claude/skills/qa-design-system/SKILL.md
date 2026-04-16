---
name: qa-design-system
description: Run a design system QA comparison between a Figma component and its Storybook implementation. Use when the user wants to compare Figma vs Storybook, run a QA check on a component, or audit design system implementation fidelity. Triggers on "QA", "design QA", "compare Figma", "Figma vs Storybook".
allowed-tools: mcp__Figma__get_design_context mcp__Figma__get_screenshot mcp__Figma__get_metadata mcp__Figma__get_variable_defs mcp__playwright__browser_navigate mcp__playwright__browser_take_screenshot mcp__playwright__browser_snapshot mcp__playwright__browser_evaluate mcp__playwright__browser_click mcp__playwright__browser_hover mcp__playwright__browser_press_key mcp__playwright__browser_wait_for Read Write Bash Glob Grep
---

# Design System QA — Figma vs Storybook

You are a design system QA specialist. Compare a component's Figma design against its Storybook implementation and produce a structured report.

## Inputs

The user will provide:
- **Figma component link** (e.g., `https://www.figma.com/design/:fileKey/:name?node-id=X-Y`)
- **Storybook component link** (e.g., `https://storybook.example.io/?path=/docs/component--docs`)

If arguments are provided: `$ARGUMENTS`

## Step 1 — Extract Figma design specs

Parse the Figma URL to get `fileKey` and `nodeId` (convert `node-id` hyphens to colons).

Use these MCP tools **in parallel** where possible:

1. **`mcp__Figma__get_design_context`** with `fileKey` and `nodeId`
   - Set `clientFrameworks: "react"` and `clientLanguages: "typescript,css"`
   - This returns code reference, screenshot, and contextual metadata
   
2. **`mcp__Figma__get_variable_defs`** with `fileKey` and `nodeId`
   - Returns design token definitions: colors, spacing, typography tokens
   - This resolves tokens from linked libraries (unlike the REST API)

3. **`mcp__Figma__get_metadata`** with `fileKey` and `nodeId`
   - Returns node hierarchy, layer types, positions, sizes in XML format

4. **`mcp__Figma__get_screenshot`** with `fileKey` and `nodeId`
   - Gets a visual screenshot of the component

From this data, extract:
- Dimensions (width, height, padding, margin, gap)
- Typography (font-family, font-size, font-weight, line-height, letter-spacing)
- Colors (fill, stroke, text color — hex/rgba AND design token names)
- Border radius, shadows, opacity
- Spacing between internal elements
- All variants, states (default, hover, focus, active, disabled), and sizes
- Icon sizes and alignment
- Layout rules

## Step 2 — Inspect Storybook implementation

Use Playwright MCP to navigate and inspect the Storybook component:

1. **Navigate** to the Storybook URL:
   ```
   mcp__playwright__browser_navigate → storybook URL
   ```

2. **Find the component iframe**: Storybook renders components in an iframe. Navigate to the iframe URL directly for clean inspection:
   - Parse the Storybook URL path (e.g., `/docs/component-reference-avatar--docs`)
   - Navigate to `/iframe.html?id=component-reference-avatar--docs&viewMode=story` for isolated rendering

3. **Take a screenshot** for visual comparison:
   ```
   mcp__playwright__browser_take_screenshot
   ```

4. **Get accessibility snapshot** for structure:
   ```
   mcp__playwright__browser_snapshot
   ```

5. **Inspect computed CSS** for each variant/state using `browser_evaluate`:
   ```javascript
   // Example: inspect avatar component
   const el = document.querySelector('.avatar-class');
   const styles = window.getComputedStyle(el);
   JSON.stringify({
     width: styles.width,
     height: styles.height,
     padding: styles.padding,
     backgroundColor: styles.backgroundColor,
     color: styles.color,
     fontFamily: styles.fontFamily,
     fontSize: styles.fontSize,
     fontWeight: styles.fontWeight,
     lineHeight: styles.lineHeight,
     letterSpacing: styles.letterSpacing,
     borderRadius: styles.borderRadius,
     boxShadow: styles.boxShadow,
     opacity: styles.opacity,
     gap: styles.gap,
     border: styles.border,
   });
   ```

6. **Check interactive states** using `browser_hover`, `browser_click`, and `browser_press_key`:
   - Hover the element → screenshot + inspect CSS for hover state
   - Focus the element (Tab key) → screenshot + inspect CSS for focus state
   - Click → check active state
   - Check disabled variants if they exist

7. **Check for design tokens in CSS**: Use `browser_evaluate` to check if CSS custom properties are used:
   ```javascript
   const el = document.querySelector('.component');
   const styles = el.getAttribute('style') || '';
   const classes = el.className;
   // Check computed values to see if they map to expected tokens
   ```

## Step 3 — Compare systematically

For every property, compare the Figma spec vs the Storybook computed value. Flag any difference.

### Cross-state token consistency check (CRITICAL)

For each property that changes across states (default → hover → focus → active → disabled):
- Verify Storybook uses the **same design tokens** as Figma across ALL states
- Flag if a token is swapped for a different token that happens to resolve to the same value today (e.g., `color/primary/default` replaced by `color/action/default` even if both are `#0066FF`). This is 🟠 Major.
- Flag if any state uses a hardcoded value while other states correctly use tokens
- Verify tokens follow expected naming patterns across the state lifecycle

### Severity scale

| Severity | Definition |
|----------|-----------|
| 🔴 Critical | Broken functionality, missing variant/state, accessibility failure (WCAG2 violation) |
| 🟠 Major | Visible discrepancy affecting visual consistency (wrong color, spacing > 2px off, wrong font-weight) |
| 🟡 Minor | Subtle differences (1-2px off, slight opacity mismatch, minor border-radius difference) |
| ⚪ Note | Observations, suggestions, non-blocking remarks |

### Special rules
- **Hardcoded values:** Flag but classify as 🟡 Minor, not Major
- **Avatar xs size (16px):** Ignore in Storybook — known exception
- **Be objective and specific.** Always report exact values from both sources.
  - ✅ GOOD: "Shadow uses `rgba(0,0,0,0.4)` in Storybook, but design token `shadow/md` specifies `rgba(0,0,0,0.15)`"
  - ❌ BAD: "The shadow looks different"

## Step 4 — Generate the report

Write the report as a markdown file at the path the user specifies (default: current directory as `qa-report-[component-name].md`).

Use this exact format:

```markdown
### [Component Name] — QA Report

**Date:** [today's date]
**Figma source:** [figma link]
**Storybook source:** [storybook link]

#### Summary
- Total issues found: X
- 🔴 Critical: X | 🟠 Major: X | 🟡 Minor: X | ⚪ Notes: X

#### Issues

**[SEVERITY] [Short title]**
- **Variant/State:** Which variant or state is affected
- **Property:** The specific property (e.g. `border-radius`, `color`, `padding`)
- **Figma value:** [exact value + token name if applicable]
- **Storybook value:** [exact computed value]
- **Notes:** Additional context

[Repeat for each issue]

#### Accessibility check
- Color contrast ratios for text elements (WCAG AA minimum)
- Focus indicators present and visible
- Interactive states keyboard-accessible

#### Token consistency matrix

| Property | Default | Hover | Focus | Active | Disabled |
|----------|---------|-------|-------|--------|----------|
| background (Figma) | `token-name` | `token-name` | `token-name` | `token-name` | `token-name` |
| background (Storybook) | `token-name` | ⚠️ `#hexvalue` (hardcoded) | `token-name` | `token-name` | `token-name` |

Mark mismatches with ⚠️.

#### Checklist of compared properties

| Property | Default | Hover | Focus | Active | Disabled |
|----------|---------|-------|-------|--------|----------|
| background | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| color | ✅ | ✅ | ✅ | ✅ | ❌ |
| [etc.] | | | | | |
```

## Step 5 — Publish and share the report

After writing the markdown file:

1. **Display the full report** in the conversation (so the user sees it immediately in the terminal)

2. **Publish to GitHub Gist** for sharing:
   ```bash
   gh gist create qa-report-[component-name].md --public --desc "QA Report: [Component Name] — Figma vs Storybook"
   ```
   This outputs the gist URL (e.g., `https://gist.github.com/username/abc123def456`).

3. **Extract the gist ID** from the URL (the last path segment, e.g., `abc123def456`).

4. **Build the shareable viewer URL**:
   ```
   https://rafagarces.github.io/qa-tool/?gist=GIST_ID
   ```
   Replace `GIST_ID` with the actual gist ID from step 3.

5. **Present to the user**:
   ```
   📄 Report saved: ./qa-report-[component-name].md
   🔗 Share with your team: https://rafagarces.github.io/qa-tool/?gist=GIST_ID
   ```

The shareable link opens a formatted, readable view of the report that any team member can access without needing Claude Code or any setup.
