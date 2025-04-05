// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAKozYLGaTaKmEXTTX_u6JLQhBG-LZ9d-I",
  authDomain: "medihub-57d45.firebaseapp.com",
  projectId: "medihub-57d45",
  storageBucket: "medihub-57d45.firebasestorage.app",
  messagingSenderId: "337591446133",
  appId: "1:337591446133:web:c300248598ed202f5fa63c",
  measurementId: "G-LG75ZZM1D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
