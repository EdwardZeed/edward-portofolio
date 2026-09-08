# Portfolio design QA

final result: passed

Source visual truth: /Users/edward/.codex/generated_images/01a08065-f420-76b1-a3e2-52592ab98791/exec-a7ce48e4-0400-4874-a1ad-cc8631b5a2c2.png
Implementation: http://127.0.0.1:3000/
Desktop evidence: /private/tmp/portfolio-desktop.png
Mobile evidence: /private/tmp/portfolio-mobile.png

## Comparison
Source: 1487 × 1058 pixels. Requested desktop CSS viewport: 1487 × 1058; browser screenshot is captured at browser output density, with browser scrollbar occupying the right edge. The source and implementation were emitted together in one comparison call. State: Bybit expanded, detail dialog closed; implementation focus remains on the contribution button after Escape. Reference tooltip depicts hover; implementation tooltip only appears during hover/focus or active interaction.

An initial desktop capture showed excess hero height and an undersized network. Reduced desktop hero padding and enlarged the network from 330 to 360px. The final paired capture confirms the work section and footer return to the intended vertical rhythm. Full-view evidence is readable enough to inspect all type and row labels, so no additional crop was needed.

## Required fidelity surfaces
- Typography: Arial/Helvetica system fallback; hierarchy, two-line introduction, labels and row roles preserved. Slight glyph-width differences from generated typography remain P3 polish.
- Spacing: wide editorial layout, aligned text rows, generous section spacing, thin separators. Desktop header, introduction, selected work and footer match the reference composition.
- Colors: warm off-white, graphite text, muted blue-gray labels, teal open-row rule and blue links.
- Asset: separately generated fine-line network illustration saved in public/assets/connections.png. No placeholder. Its topology differs slightly from the concept (P3); the visual language and scale are retained. Pointer tilt and click rotation are whole-image interactions, not individually simulated nodes.
- Copy: selected screenshot wording retained; contribution details grounded in the supplied CV. No invented certification or endorsement.

## Interaction checks
Browser tested: mobile accordion switches from Bybit to Bluerate; contribution dialog displays Bybit details; Escape dismisses dialog and returns focus. GitHub/LinkedIn destinations inspected in the accessibility tree, PDF links point to supplied local CV, contact is a mailto link. External destinations were not navigated and no email sent. Browser error logs: none at inspection.
390 × 844 responsive capture: readable single-column intro, compact nav, centered network, stacked role labels; no visible horizontal overflow. Reduced-motion CSS disables transitions and animation; pointer tilt is skipped when reduced motion is requested.

Dynamic globe follow-up: the static network image was replaced with a canvas-rendered 3D projection that preserves the reference scale and restrained palette. Browser inspection confirmed the globe renders in the intended hero position and its button toggles from `aria-pressed=false` to `aria-pressed=true`, revealing the “People. Ideas. Systems.” state. The animation pauses outside the viewport or while the document is hidden, caps device pixel ratio at 2, and respects `prefers-reduced-motion`. Pointer proximity, moving signal dots, passive rotation, and the click acceleration are progressive visual effects; the semantic button remains keyboard operable.

Full-screen opening follow-up: the initial state now uses a 125svh scroll scene with a sticky, 78vmin globe as the primary visual. Name, role and scroll cue stay subordinate at the viewport edge. Scroll progress moves, scales and fades the globe before revealing a separate full profile section and the existing work content. The opening and reveal states were captured at `/private/tmp/portfolio-globe-opening.png` and `/private/tmp/portfolio-globe-reveal.png`; both were compared with the selected direction in `/private/tmp/portfolio-scroll-comparison.jpg`. The larger globe preserves the selected network language while the second state restores the original personal introduction hierarchy. No P0/P1/P2 visual issue remains; the generous whitespace during the transition is intentional pacing.

Company constellation follow-up: the generic “Connections” state was removed. Four emphasized nodes now represent Bybit, Bluerate, Mira and Strong Compute; visible front-facing nodes carry restrained labels. Hovering or keyboard selection highlights the node and its connected paths and shows the company role. Clicking the node, or pressing Enter, scrolls to and expands the matching work entry. Browser verification covered ArrowRight selection, the Bybit information card, and Enter navigation to the expanded Bybit row. Labels are clamped to the canvas bounds to prevent clipping. Final evidence: `/private/tmp/portfolio-company-globe.png`.

## Follow-up polish
P3: exact generated typeface and exact network topology differ slightly. No blocking P0/P1/P2 findings remain. This is a local implementation; not deployed.
