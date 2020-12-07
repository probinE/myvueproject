// src/firebaseConfig.js
import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyBICgQS2enZ5yAaAPCnIT4VmCerN-P3Kvw',
	authDomain: 'vueproject-79a99.firebaseapp.com',
	projectId: 'vueproject-79a99',
	storageBucket: 'vueproject-79a99.appspot.com',
	messagingSenderId: '1058207290294',
	appId: '1:1058207290294:web:8c8276d0e6f63eb5086717',
	measurementId: 'G-TSR3F72SSW'
}
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)
