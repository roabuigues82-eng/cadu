// ── Push desde servidor (Supabase) ──────────────────────────────────────────
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : { title: '🛒 Caducidades', body: 'Revisa los productos' };
  e.waitUntil(self.registration.showNotification(d.title || '🛒 Caducidades', {
    body: d.body || '', icon: '/cadu/icon-192.png', badge: '/cadu/icon-192.png',
    tag: 'cadu-daily', requireInteraction: false
  }));
});

// ── Notificación local programada (funciona con app cerrada en Android) ──────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://roabuigues82-eng.github.io/cadu'));
});

// Recibe la hora programada desde la app y la guarda
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIF') {
    const { hora } = e.data; // "08:30"
    self.registration.showNotification; // keep alive hint
    scheduleNext(hora);
  }
  if (e.data && e.data.type === 'CANCEL_NOTIF') {
    clearSchedule();
  }
});

let _timer = null;
function clearSchedule() {
  if (_timer) { clearTimeout(_timer); _timer = null; }
}

async function scheduleNext(hora) {
  clearSchedule();
  if (!hora) return;
  const [hh, mm] = hora.split(':').map(Number);
  const now = new Date();
  let next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const ms = next - now;
  _timer = setTimeout(async () => {
    await fireLocalNotif();
    scheduleNext(hora); // reprogramar para mañana
  }, ms);
}

async function fireLocalNotif() {
  // Leer productos del cliente para construir el mensaje
  const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
  let msg = 'Revisa los productos próximos a caducar';
  if (allClients.length > 0) {
    // Pedir el mensaje al cliente activo
    const reply = await new Promise(resolve => {
      const ch = new MessageChannel();
      ch.port1.onmessage = e => resolve(e.data);
      allClients[0].postMessage({ type: 'GET_NOTIF_MSG' }, [ch.port2]);
      setTimeout(() => resolve(null), 2000);
    });
    if (reply && reply.msg) msg = reply.msg;
  }
  await self.registration.showNotification('🛒 Caducidades', {
    body: msg, icon: '/cadu/icon-192.png', badge: '/cadu/icon-192.png',
    tag: 'cadu-daily', requireInteraction: false
  });
}

// Al instalar, intentar leer la hora guardada y reprogramar
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.open('cadu-v1').then(async cache => {
      const r = await cache.match('/_notif_hora');
      if (r) {
        const { hora } = await r.json();
        if (hora) scheduleNext(hora);
      }
    }).catch(() => {})
  );
});
