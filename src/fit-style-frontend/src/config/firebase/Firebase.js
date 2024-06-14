import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import ToastMessages from "../../components/toastmessages/ToastMessages";
import { firebaseToken } from "../../packages/api";
import { onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "onboard-d43ee.firebaseapp.com",
  projectId: "onboard-d43ee",
  storageBucket: "onboard-d43ee.appspot.com",
  messagingSenderId: "637225936636",
  appId: "1:637225936636:web:4dc8c018f0e1ff2f05d979",
  measurementId: "G-R511GDMSBY",
};

console.log("Initializing Firebase with config:", firebaseConfig);
firebase.initializeApp(firebaseConfig);

let messaging;
try {
  messaging = firebase.messaging();
  console.log("Firebase messaging initialized:", messaging);
} catch (error) {
  console.error("Error initializing Firebase messaging:", error);
}

export const getFirebaseToken = async () => {
  try {
    console.log("Registering service worker...");
    const serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log("Service worker registered:", serviceWorkerRegistration);

    const currentToken = await messaging.getToken({
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration
    });
    if (currentToken) {
      console.log("Token acquired:", currentToken);
      await firebaseToken.saveToken({ token: currentToken }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("getToken error:", error);
  }
};

export { messaging };
