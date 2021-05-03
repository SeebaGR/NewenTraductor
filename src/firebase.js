import firebase from 'firebase'

const firebaseConfig = {

    apiKey: "AIzaSyCzv6--TF-AK-pIOV46tB7YEb3Nr6W4yQk",
    authDomain: "traductor-newen.firebaseapp.com",
    databaseURL: "https://traductor-newen-default-rtdb.firebaseio.com",
    projectId: "traductor-newen",
    storageBucket: "traductor-newen.appspot.com",
    messagingSenderId: "67453309729",
    appId: "1:67453309729:web:2f32c48c061e43120d2460",
    measurementId: "G-8BEGG5H79H"
};

firebase.initializeApp(firebaseConfig);


export default firebase;