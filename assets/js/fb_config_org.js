import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL0-XxntXKlutHbqKdw0oSDqkAr1mQcyc",
    authDomain: "vbac-it-task.firebaseapp.com",
    databaseURL: "https://vbac-it-task-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vbac-it-task",
    storageBucket: "vbac-it-task.appspot.com",
    messagingSenderId: "30128087818",
    appId: "1:30128087818:web:7aac978dcf7501a77c90f3",
    measurementId: "G-RKKC4SBC62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { onAuthStateChanged,auth, app, database, ref, set, get, onValue , firebaseConfig};
