import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectUrl, isTrackerHost } from '../src/rules.js';
test('HTTPS URL has no common warning signs',()=>{const r=inspectUrl('https://example.com/path');assert.equal(r.hostname,'example.com');assert.equal(r.level,'low');});
test('HTTP URL is flagged',()=>{const r=inspectUrl('http://example.com');assert.ok(r.reasons.some(x=>x.includes('HTTPS')));});
test('embedded credentials are flagged',()=>{assert.ok(inspectUrl('https://user:pass@example.com').reasons.some(x=>x.includes('username or password')));});
test('punycode is flagged',()=>{assert.ok(inspectUrl('https://xn--e1afmkfd.example').reasons.some(x=>x.includes('punycode')));});
test('invalid URL is high caution',()=>{assert.equal(inspectUrl('not a url').level,'high');});
test('known tracker host and subdomain are recognized',()=>{assert.equal(isTrackerHost('google-analytics.com'),true);assert.equal(isTrackerHost('www.google-analytics.com'),true);assert.equal(isTrackerHost('my-example.com'),false);});
