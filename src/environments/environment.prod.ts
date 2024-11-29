import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCp6HEhOvp4ZflagIU49DPabpXbkZlouTU",
    authDomain: "compisalvolante-ee5d6.firebaseapp.com",
    projectId: "compisalvolante-ee5d6",
    storageBucket: "compisalvolante-ee5d6.appspot.com",
    messagingSenderId: "731715264908",
    appId: "1:731715264908:web:b3d128d19115520d8d76a9",
    measurementId: "G-1DXG79C7WQ"
  }
};

// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);
export const db = getFirestore(app);
