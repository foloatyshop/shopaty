import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage }  from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDiHbY_YTJYl7bX5g7gH6w10qlCjrZGIaM",
    authDomain: "greenshop-fb362.firebaseapp.com",
    projectId: "greenshop-fb362",
    storageBucket: "greenshop-fb362.appspot.com",
    messagingSenderId: "1028511170048",
    appId: "1:1028511170048:web:cb30263f355b209e7e22e5",
    measurementId: "G-XQG65DZHKH"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
// export const analytics = getAnalytics(app);