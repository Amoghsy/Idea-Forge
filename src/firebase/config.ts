// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnITpjw3h-WRpODY9Cv9Y2Ki1EcG3TZWM",
  authDomain: "alertsphere-62588.firebaseapp.com",
  projectId: "alertsphere-62588",
  storageBucket: "alertsphere-62588.firebasestorage.app",
  messagingSenderId: "283626450279",
  appId: "1:283626450279:web:7f55890268beea988653c2",
  measurementId: "G-ES2SVQY51F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

async function initNotifications() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "SBmTdRyrJjv7rVSEROQVSu-DmqrzySqyyNy8nkNt2-w",
    });
    console.log("Citizen FCM token:", token);
    // This token can be subscribed to "alerts" topic on backend if needed
  } else {
    console.log("Notifications permission denied");
  }
}

// Listen for foreground notifications
onMessage(messaging, (payload) => {
  console.log("Foreground notification:", payload);
  const title = payload.notification?.title ?? "Alert";
  const body = payload.notification?.body ?? "";

  // Only create a Notification when the API is available and we have a title
  if (typeof window !== "undefined" && "Notification" in window && title) {
    new Notification(title, {
      body,
      icon: "/icons/alert.png",
    });
  }
});

initNotifications();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
