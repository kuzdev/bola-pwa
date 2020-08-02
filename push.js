var webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BOit_dyxuA3SBRq2ulZttDj4yc9m8WoRBrSiq3XIGPxFX5ioJH9aDBr2EhIUmiHv7EDOGf7iYU4kmw7yWm1gyLA",
  "privateKey": "1ojw8fiNPUPBSpENUNJ-p-uyBjRRCBNTjwy29mb7ahY"
};


webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/dajr71hYsN4:APA91bEdYeh6w5g5s8sQRu0FNoPttEjTDPHfOLl2OQEa3xnEVwRvCP0nmQhMzW_iK4uaZAQaP0sr155bpPTGG6s11nL4N3gMKKTc1awltQiSsTE8QYoRVG11UUkKZwiRbBFCIvb1hyeT",
  "keys": {
    "p256dh": "BDflah+E1ATbL752dgWNIvZTLKyxOMvj/PpRSDrVqMHByCzMkzp0uk+LPJ2hJtWRDJAKwFNwQx78/Dg3TFq4jIo=",
    "auth": "moSs8ixmv3FLgh6J2Pmg4Q=="
  }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '705827216753',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);