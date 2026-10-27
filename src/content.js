(() => {
  if (window.__clearTraceInstalled) return;
  window.__clearTraceInstalled = true;
  const known = ['doubleclick.net','google-analytics.com','googletagmanager.com','connect.facebook.net','analytics.tiktok.com','hotjar.com','segment.io','segment.com','scorecardresearch.com','clarity.ms','quantserve.com','adnxs.com','mixpanel.com'];
  const seen = new Set();
  const isTracker = host => known.some(d => host === d || host.endsWith('.' + d));
  function scan() {
    document.querySelectorAll('script[src], iframe[src], img[src], link[href]').forEach(el => {
      const raw = el.src || el.href;
      try { const u = new URL(raw, location.href); if (u.origin !== location.origin && isTracker(u.hostname) && !seen.has(u.hostname)) { seen.add(u.hostname); chrome.runtime.sendMessage({ type: 'TRACKER_SEEN', host: u.hostname }).catch(() => {}); } } catch {}
    });
  }
  scan();
  const observer = new MutationObserver(scan);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 120000);
})();
