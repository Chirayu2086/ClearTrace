# Chrome Web Store listing draft

## Name
ClearTrace — Privacy & Link Safety

## Short description
See known tracker domains, inspect suspicious URL patterns, and optionally block selected trackers.

## Detailed description
ClearTrace gives you a local-first view of common browsing privacy signals.
- Tracker awareness: inspect selected page elements for a curated set of known third-party tracker domains.
- Link inspection: highlight URL warning signs such as embedded credentials, punycode, IP-based hosts and unusually long hostnames.
- Optional blocking: enable rules for a limited list of tracker and advertising domains. Some sites may lose functionality.
- Transparent controls: review and disable protection in settings.

ClearTrace does not connect to a threat-intelligence service and does not guarantee a URL is safe. Its tracker list is limited and cannot detect every tracking technique. Link inspection is heuristic, not a malware verdict.

## Permission disclosure
The extension uses local storage for settings and observed tracker domains. When the user turns on tracker blocking, Chrome asks for optional access to HTTP and HTTPS websites so blocking rules can apply. It uses current-tab permission to inspect page element URLs after the user opens the popup. It does not configure remote analytics or transmit browsing history to a server.

## Screenshots to prepare
Capture genuine screenshots from the tested extension: popup tracker awareness, URL inspection warning, and settings page. Do not fabricate product UI screenshots.
