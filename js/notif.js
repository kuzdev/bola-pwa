function regNotif() {
  if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BOit_dyxuA3SBRq2ulZttDj4yc9m8WoRBrSiq3XIGPxFX5ioJH9aDBr2EhIUmiHv7EDOGf7iYU4kmw7yWm1gyLA')
      }).then(function (subscribe) {
        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
          null, new Uint8Array(subscribe.getKey('p256dh')))));
        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
          null, new Uint8Array(subscribe.getKey('auth')))));
      }).catch(function (e) {
        console.error('Tidak dapat melakukan subscribe ', e.message);
      });
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}