import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const currentDir = join(root, 'public');
const legacyDir = join(root, 'migration-artifacts', 'legacy-public');

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function routeFor(file, base) {
  const name = relative(base, file).split(sep).join('/');
  if (name === 'index.html') return '/';
  if (name.endsWith('/index.html')) return `/${name.slice(0, -10)}`;
  return `/${name}`;
}

function routeSet(dir) {
  return new Set(walk(dir).filter(file => extname(file) === '.html').map(file => routeFor(file, dir)));
}

function stripCode(html) {
  return html
    .replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/gi, '')
    .replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, '');
}

function localTargetExists(rawUrl) {
  if (!rawUrl.startsWith('/') || rawUrl.startsWith('//')) return true;
  const rawPath = rawUrl.split(/[?#]/, 1)[0];
  let decoded;
  try { decoded = decodeURIComponent(rawPath); } catch { decoded = rawPath; }
  const relativePath = decoded.replace(/^\/+/, '').replaceAll('/', sep);
  const target = join(currentDir, relativePath);
  return existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')))
    || existsSync(`${target}.html`)
    || existsSync(join(target, 'index.html'));
}

const legacyRoutes = routeSet(legacyDir);
const currentRoutes = routeSet(currentDir);
const missingLegacyRoutes = [...legacyRoutes].filter(route => !currentRoutes.has(route)).sort();
const addedRoutes = [...currentRoutes].filter(route => !legacyRoutes.has(route)).sort();
const unrenderedTags = [];
const missingLocalTargets = new Map();
const oldDomainReferences = [];
const sensitivePatterns = [];

for (const file of walk(currentDir).filter(file => extname(file) === '.html')) {
  const route = routeFor(file, currentDir);
  const html = readFileSync(file, 'utf8');
  const prose = stripCode(html);
  if (/\{%\s*[a-zA-Z]/.test(prose)) unrenderedTags.push(route);
  if (/https?:\/\/happyseashell\.gitee\.io/i.test(html)) oldDomainReferences.push(route);
  if (/(master[_-]?key|client[_-]?secret|private[_-]?key|bearer\s+[a-z0-9._-]+)/i.test(html)) {
    sensitivePatterns.push(route);
  }
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const url = match[1];
    if (!localTargetExists(url)) {
      const routes = missingLocalTargets.get(url) ?? [];
      if (routes.length < 5) routes.push(route);
      missingLocalTargets.set(url, routes);
    }
  }
}

const report = {
  legacyHtmlRoutes: legacyRoutes.size,
  currentHtmlRoutes: currentRoutes.size,
  missingLegacyRoutes,
  addedRoutes,
  unrenderedTags,
  missingLocalTargets: Object.fromEntries([...missingLocalTargets].sort()),
  oldDomainReferences: [...new Set(oldDomainReferences)].sort(),
  sensitivePatterns: [...new Set(sensitivePatterns)].sort()
};

console.log(JSON.stringify(report, null, 2));

if (missingLegacyRoutes.length || unrenderedTags.length || missingLocalTargets.size || sensitivePatterns.length) {
  process.exitCode = 1;
}
