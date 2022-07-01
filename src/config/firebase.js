import firebase  from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBR-JuLEadif_5u1kitBZsh2p6CjqpzBA4",
    authDomain: "auctiondb-6f1ae.firebaseapp.com",
    projectId: "auctiondb-6f1ae",
    storageBucket: "auctiondb-6f1ae.appspot.com",
    messagingSenderId: "871873608974",
    appId: "1:871873608974:web:ca028aa01647619a19ab5f"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();