import app from '../firebase'
import {getAuth, GoogleAuthProvider, NextOrObserver, signInWithPopup, User} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (auth = getAuth(app), method = signInWithPopup) => {
    await method(auth, googleAuthProvider)
        .then((result) => {
            console.log(result.user)
        }).catch((error) => {
            console.log(error)
            throw error
        })
}

export const signOut = (auth = getAuth(app)) => auth.signOut().then(() => {
    console.log('sign out')
}).catch((error) => {
    console.log(error)
    throw error
});

export const getCurrentUser = (auth = getAuth(app)) => auth.currentUser;

// listen login
export const onAuthStateChanged = (auth = getAuth(app), callback: NextOrObserver<User | null>) => auth.onAuthStateChanged(callback);