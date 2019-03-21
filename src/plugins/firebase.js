import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDVvndvTPQ-Qm5NspAj1j8It9G49ww0n3I",
    authDomain: "vue-firebase-35cf4.firebaseapp.com",
    databaseURL: "https://vue-firebase-35cf4.firebaseio.com",
    projectId: "vue-firebase-35cf4",
    storageBucket: "vue-firebase-35cf4.appspot.com",
    messagingSenderId: "266039567922"
};
firebase.initializeApp(config);

const auth = firebase.auth()
const owner = firebase.firestore().collection('owner')
const instance = firebase.firestore().collection('instance')

export {
    owner,
    instance,
    auth
}