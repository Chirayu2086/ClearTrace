# ClearTrace — Privacy & Link Safety

A local-first Chrome extension built with Manifest V3. ClearTrace provides best-effort awareness of known third-party tracker domains, local URL-structure warnings, and optional blocking rules for a limited list of tracker/ad domains.

## Features
- **Tracker awareness:** scans selected script, iframe, image and link elements for curated tracker domains when the user opens the popup.
- **Suspicious-link checks:** flags embedded credentials, non-HTTPS URLs, punycode, IP hosts, unusually long URLs/hostnames, many subdomains, and deceptive-looking hostname keywords.
- **Optional blocking:** uses dynamic `declarativeNetRequest` rules for a small domain list; disabled by default and requires optional site access.
- **Privacy controls:** toggle blocking and remove optional permissions.
- **Local-first:** no analytics, accounts, remote scripts, or reputation API are configured.

## Install locally
1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome and enable **Developer mode**.
3. Select **Load unpacked** and choose the repository root (the folder containing `manifest.json`).
4. Open a normal HTTP/HTTPS website and click ClearTrace. Reload the page to refresh observations.
5. Blocking is off by default. Enable it only if you accept Chrome's optional site-access prompt; some sites may break.

## Tests
Requires Node.js 18+. Run `npm test`. The suite covers URL heuristics and tracker-domain matching; it does not replace manual Chrome integration tests.

## Permissions review
- `storage`: settings and per-site tracker observations stored locally.
- `activeTab` and `scripting`: scan the current tab after the user opens the popup.
- Optional `declarativeNetRequest`: only used for explicitly enabled tracker blocking.
- Optional `http://*/*` and `https://*/*`: broad site access requested only when enabling blocking.

## Limitations
Tracker awareness is best-effort, not a complete network audit. The curated list is finite and can become stale. URL scoring is heuristic and does not query live threat intelligence or prove that a destination is safe or malicious. Blocking is not a full ad blocker and may affect essential site functionality.

## Chrome Web Store preparation
Before publishing, verify branding, test on supported Chrome versions, inspect extension/service-worker errors, validate permission prompts and disable flows, prepare genuine screenshots, provide a publisher contact and hosted privacy policy, and accurately complete the Chrome Web Store privacy questionnaire. See `docs/STORE_LISTING.md` and `docs/PRIVACY.md`. A dedicated 16/48/128 px PNG icon set and final store assets still need to be added before submission.

## Project layout
`manifest.json` · `src/` popup, options, scanner and service worker · `tests/` automated tests · `docs/` store listing and privacy notes.
