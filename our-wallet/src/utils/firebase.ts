// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBa2k1Hnh0t-Hr2-JaqTTViyDyrCl_iSEM",
    authDomain: "dd-coin.firebaseapp.com",
    projectId: "dd-coin",
    storageBucket: "dd-coin.appspot.com",
    messagingSenderId: "383941309740",
    appId: "1:383941309740:web:02bba0f0a248f66ce46889",
    measurementId: "G-2WM69VL4V1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;