import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA07oVkRqEChM29A0VhA1YDw3MJtZkXfx0",
  authDomain: "milktealab-1cbd2.firebaseapp.com",
  projectId: "milktealab-1cbd2",
  storageBucket: "milktealab-1cbd2.appspot.com",
  messagingSenderId: "724808268758",
  appId: "1:724808268758:web:a757b29160d1a7f8310277"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
