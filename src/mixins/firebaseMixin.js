import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

firebase.initializeApp({
    apiKey: 'AIzaSyDKMj7TnGNIfpP3PBR6QEk4udlapim6Uqo',
    authDomain: 'user-role-management-85022.firebaseapp.com',
    databaseURL: 'https://user-role-management-85022-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'user-role-management-85022',
    storageBucket: 'user-role-management-85022.appspot.com',
    messagingSenderId: '962279158016',
    appId: '1:962279158016:web:893e417fa126c6036703e5'
});

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const database = firebase.database();

// export utils/refs
export {
    db,
    auth,
    database
};
