/**
 * Service Worker for 五次元経営 PWA
 * - オフラインキャッシュ対応
 * - アプリとして動作するための基本機能
 */

const CACHE_NAME = '5dmgmt-v1';
const OFFLINE_URL = '/offline.html';

// キャッシュするリソース
const STATIC_ASSETS = [
  '/',
  '/unki/shukuyo',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/logo.png',
  '/logo-header.png'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ネットワークファースト戦略（HTMLはネットワーク優先、失敗時にキャッシュ）
self.addEventListener('fetch', (event) => {
  // ナビゲーションリクエスト（HTML）
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request) || caches.match('/');
        })
    );
    return;
  }

  // その他のリソースはキャッシュファースト
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        // 成功したレスポンスをキャッシュに保存
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
