/**
 * Auto-publish script for Blue Jay Appliance blog.
 *
 * Schedule: 2 articles per week
 *   - Article 1: random day Sun(0)–Wed(3)
 *   - Article 2: random day Thu(4)–Sat(6)
 *
 * Uses ISO week number as a seed so the same week always picks the
 * same publish days, making the cron idempotent (safe to re-run).
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_PATH = path.resolve(__dirname, '..', 'src', 'data', 'articles.json');

// ── Helpers ────────────────────────────────────────────────────
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// Simple seeded PRNG (mulberry32)
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function setOutput(key, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    fs.appendFileSync(outputFile, `${key}=${value}\n`);
  }
  console.log(`::set-output name=${key}::${value}`);
}

// ── Main ───────────────────────────────────────────────────────
const now = new Date();
const dayOfWeek = now.getUTCDay(); // 0=Sun .. 6=Sat
const week = getISOWeek(now);
const year = now.getUTCFullYear();
const seed = year * 100 + week;

// Determine the two publish days for this week
const rand1 = seededRandom(seed);
const rand2 = seededRandom(seed + 1);
const publishDay1 = Math.floor(rand1 * 4);       // 0–3 (Sun–Wed)
const publishDay2 = 4 + Math.floor(rand2 * 3);   // 4–6 (Thu–Sat)

const isPublishDay = (dayOfWeek === publishDay1) || (dayOfWeek === publishDay2);
const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const scheduleInfo = `Week ${week}: Article 1 on ${dayNames[publishDay1]}, Article 2 on ${dayNames[publishDay2]}. Today is ${dayNames[dayOfWeek]}.`;

console.log(scheduleInfo);

if (!isPublishDay) {
  console.log('Not a publish day — skipping.');
  setOutput('published', 'false');
  setOutput('skip_reason', scheduleInfo + ' Not a publish day.');
  process.exit(0);
}

// Load articles
const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));
const unpublished = articles.filter(a => !a.published);

if (unpublished.length === 0) {
  console.log('No unpublished articles remaining.');
  setOutput('published', 'false');
  setOutput('skip_reason', 'No unpublished articles remaining in the queue.');
  process.exit(0);
}

// Publish the next article in queue order
const target = unpublished[0];
target.published = true;
target.publishDate = now.toISOString();

fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));

console.log(`Published: ${target.title} (${target.slug})`);
setOutput('published', 'true');
setOutput('article_title', target.title);
setOutput('article_slug', target.slug);
setOutput('schedule_info', scheduleInfo);
