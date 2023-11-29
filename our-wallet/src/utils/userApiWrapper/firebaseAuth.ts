import app from '../firebase'
import {getAuth, GoogleAuthProvider, NextOrObserver, signInWithPopup, User} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = (auth = getAuth(app)) => signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential)
        console.log(result.user)
    }).catch((error) => {
        console.log(error)
    });

export const signOut = (auth = getAuth(app)) => auth.signOut().then(() => {
    console.log('sign out')
}).catch((error) => {
    console.log(error)
});

export const getCurrentUser = (auth = getAuth(app)) => auth.currentUser;

// listen login
export const onAuthStateChanged = (auth = getAuth(app), callback: NextOrObserver<User | null>) => auth.onAuthStateChanged(callback);