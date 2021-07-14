import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCqm22dp-nl_Ei7oWteCd4KOExA8l1_8N8",
    authDomain: "react-ecom-9c22f.firebaseapp.com",
    projectId: "react-ecom-9c22f",
    storageBucket: "react-ecom-9c22f.appspot.com",
    messagingSenderId: "800185290730",
    appId: "1:800185290730:web:e37d08cf6b15f2bfa22c93",
    measurementId: "G-XCH925J4L7"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;