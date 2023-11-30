import app from '../firebase'
import {getAuth, GoogleAuthProvider, NextOrObserver, signInWithPopup, User} from "firebase/auth";

type PROVIDER_TYPE = 'GOOGLE' | 'ANONYMOUS';
export const signInProviderFactory = (type: PROVIDER_TYPE) => {
    switch (type) {
        case 'GOOGLE':
            return new GoogleAuthProvider();
        case 'ANONYMOUS':
            throw new Error('not implement')
        default:
            throw new Error('wrong type')
    }
}

export const signIn = async (auth = getAuth(app), method = signInWithPopup, provider = signInProviderFactory('GOOGLE')) => {
    await method(auth, provider)
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