importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // apiKey: "REPLACE_WITH_REACT_APP_FIREBASE_API_KEY",
  authDomain: "onboard-d43ee.firebaseapp.com",
    projectId: "onboard-d43ee",
    storageBucket: "onboard-d43ee.appspot.com",
    messagingSenderId: "637225936636",
    appId: "1:637225936636:web:4dc8c018f0e1ff2f05d979",
    measurementId: "G-R511GDMSBY",
  });
  
  // Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Function to save notifications to local storage
// function saveNotificationToLocalStorage(notification) {
//   const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
//   existingNotifications.push(notification);
//   localStorage.setItem('notifications', JSON.stringify(existingNotifications));
// }
// Handle background messages.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Save notification to local storage
  // saveNotification(payload.notification);
  // saveNotificationToLocalStorage(payload.notification);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
