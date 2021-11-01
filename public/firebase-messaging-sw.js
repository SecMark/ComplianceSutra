// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBCvz-TUVm2q9H5hIX_8QK_lrE2OUNtIqU",
  authDomain: "compliancesutra.firebaseapp.com",
  projectId: "compliancesutra",
  storageBucket: "compliancesutra.appspot.com",
  messagingSenderId: "788555626683",
  appId: "1:788555626683:web:64478df8c18130ee34919e",
  measurementId: "G-NSCC4CGY9S",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
