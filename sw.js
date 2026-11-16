/* AutoSphere Global - Service Worker
 * - يحفظ ملفات الواجهة المحلية فقط (المسارات نسبية).
 * - الصفحات: شبكة أولاً ثم الكاش عند انقطاع الإنترنت.
 * - الملفات الأخرى: كاش أولاً ثم الشبكة.
 * - لا يخزن طلبات الخرائط أو CDN الخارجية.
 */
const CACHE_PREFIX = 'autosphere-';
const CACHE_VERSION = 'v14';  // ارفع الرقم عند كل تغيير في ملفات الواجهة
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;
// ملاحظة: لا نضع './' هنا، فعلى GitHub Pages يشير إلى مجلد وليس ملفاً، فيفشل التخزين كله
const PRECACHE = [
  './index.html',
  './manifest.json',
  './js/phone.js',
  './js/money.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .catch(err => console.error('[sw] precache failed', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // نحذف كاشات هذا التطبيق القديمة فقط، ولا نلمس كاشات تطبيقات أخرى على نفس النطاق
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // لا نتدخل في CDN أو الخرائط

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put('./index.html', copy)).catch(() => {});
          return res;
        })
        .catch(async err => {
          console.error('[sw] navigation offline, serving cached page', err);
          const cached = await caches.match('./index.html');
          return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).catch(err => {
      console.error('[sw] fetch failed', req.url, err);
      return Response.error();
    }))
  );
});
