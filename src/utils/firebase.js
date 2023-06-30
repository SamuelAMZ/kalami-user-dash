// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnylKC95pfmhVNuHGKbwmA3REkvb5SyUY",
  authDomain: "clonegpt-fe34c.firebaseapp.com",
  projectId: "clonegpt-fe34c",
  storageBucket: "clonegpt-fe34c.appspot.com",
  messagingSenderId: "236509212846",
  appId: "1:236509212846:web:01d61d262bc9756f35fd3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
