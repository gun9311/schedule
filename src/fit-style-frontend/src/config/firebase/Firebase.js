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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const getFirebaseToken = async () => {
  try {
    const serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const currentToken = await messaging.getToken({
      vapidKey:
        "BHLu6ZhlJIIn7NsUocED4WPqN0msixh78ckorbM2W4aRfA7CpPObO5ag3ZA-LGPUXRgkdvzQdBs5pEcRsD4ZTDE", serviceWorkerRegistration
    });
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log("Token acquired:", currentToken);
      // Send token to server
      await firebaseToken.saveToken({ token: currentToken }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          // ToastMessages.error("토큰 저장 실패");
        }
      );
    } else {
      console.log("등록된 토큰이 없습니다");
    }
  } catch (error) {
    console.error("getToken 에러", error);
  }
  
};

export { messaging };

// // Handle foreground messages
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//       body: payload.notification.body,
//       icon: '/firebase-logo.png'
//   };

//   if (Notification.permission === 'granted') {
//       new Notification(notificationTitle, notificationOptions);
//   }
// });
