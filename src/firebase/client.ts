// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5Md6pIb3c9_NIngUiFVdm-qhywAzeT7s",
  authDomain: "werewolves-bcn-game.firebaseapp.com",
  projectId: "werewolves-bcn-game",
  storageBucket: "werewolves-bcn-game.appspot.com",
  messagingSenderId: "675184049051",
  appId: "1:675184049051:web:f444e555a4e4109051ff3e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
if (!import.meta.env.PROD) {
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  const db = getFirestore(app);
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
