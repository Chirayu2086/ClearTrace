// Local heuristic URL inspection. This is not a reputation database and cannot certify safety.
export function inspectUrl(input) {
  const result = { level: 'low', score: 0, reasons: [], hostname: '', normalized: '' };
  let url;
  try { url = new URL(String(input).trim()); }
  catch { return { ...result, level: 'high', score: 100, reasons: ['This is not a valid absolute URL.'] }; }
  result.hostname = url.hostname;
  result.normalized = url.href;
  if (!['http:', 'https:'].includes(url.protocol)) { result.score += 70; result.reasons.push('Unexpected link protocol.'); }
  if (url.username || url.password) { result.score += 35; result.reasons.push('The URL contains embedded username or password text.'); }
  if (url.protocol !== 'https:' && url.hostname !== 'localhost' && !/^127\./.test(url.hostname)) { result.score += 15; result.reasons.push('The link does not use HTTPS.'); }
  if (url.hostname.startsWith('xn--') || url.hostname.split('.').some(p => p.startsWith('xn--'))) { result.score += 25; result.reasons.push('The domain uses punycode, which can obscure lookalike characters.'); }
  if (/\d{1,3}(?:\.\d{1,3}){3}/.test(url.hostname) && !/^127\./.test(url.hostname)) { result.score += 20; result.reasons.push('The destination uses an IP address instead of a typical domain name.'); }
  if (url.hostname.length > 50) { result.score += 10; result.reasons.push('The hostname is unusually long.'); }
  if (url.hostname.split('.').length >= 5) { result.score += 10; result.reasons.push('The hostname has many subdomains.'); }
  if (/(login|verify|secure|account|wallet|password|payment|gift|prize|urgent)/i.test(url.hostname)) { result.score += 10; result.reasons.push('The hostname contains words sometimes used in deceptive links.'); }
  if (url.href.length > 180) { result.score += 5; result.reasons.push('The URL is unusually long.'); }
  result.score = Math.min(100, result.score);
  result.level = result.score >= 50 ? 'high' : result.score >= 20 ? 'medium' : 'low';
  if (!result.reasons.length) result.reasons.push('No common URL warning signs were detected. This is not proof that the site is safe.');
  return result;
}
export const TRACKER_HOSTS = ['doubleclick.net','google-analytics.com','googletagmanager.com','connect.facebook.net','facebook.com/tr','analytics.tiktok.com','hotjar.com','segment.io','segment.com','scorecardresearch.com','clarity.ms','quantserve.com','adnxs.com','mixpanel.com'];
export function isTrackerHost(hostname) {
  const host = String(hostname || '').toLowerCase().replace(/^www\./, '');
  return TRACKER_HOSTS.some(entry => { const domain = entry.split('/')[0]; return host === domain || host.endsWith('.' + domain); });
}
