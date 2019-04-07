import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAdOz4MJVDkHXF6Ibc590BUg77PZP8PLrY",
    authDomain: "eiuran.firebaseapp.com",
    databaseURL: "https://eiuran.firebaseio.com",
    projectId: "eiuran",
    storageBucket: "eiuran.appspot.com",
    messagingSenderId: "442442606176"
};
firebase.initializeApp(config);

const login = function (user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
}



const auth = firebase.auth()
const dbBatch = firebase.firestore().batch()
const cOwner = firebase.firestore().collection('owner')
const cTvKabel = firebase.firestore().collection('tvkabel')
const cCustomer = firebase.firestore().collection('customer_dummy')

export {
    dbBatch,
    cOwner,
    cTvKabel,
    cCustomer,
    login,
    auth
}