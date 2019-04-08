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

firebase.firestore().enablePersistence().then(function () {
    alert('database persistence enable')
}).catch(function (err) {
    if (err.code == 'failed-precondition') {
        alert('Please just use one tab :)')
    } else if (err.code == 'unimplemented') {
        alert('This browser is not supported, please use other browser (eg: chrome, firefox)')
    }
})

const login = function (user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
}



const auth = firebase.auth()
const firestore = firebase.firestore()
const batch = firebase.firestore().batch()
const instance = firebase.firestore().collection('instance')

export {
    login,
    auth,
    firestore,
    instance,
    batch
}