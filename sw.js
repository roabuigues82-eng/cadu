self.addEventListener('push',e=>{
  const d=e.data?e.data.json():{title:'🛒 Caducidades',body:'Revisa los productos'};
  e.waitUntil(self.registration.showNotification(d.title||'🛒 Caducidades',{
    body:d.body||'',icon:'/cadu/icon-192.png',badge:'/cadu/icon-192.png',tag:'cadu-daily',
    requireInteraction:false
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow('https://roabuigues82-eng.github.io/cadu'));
});
