import {createContext, ReactNode, useEffect, useState} from 'react';
import {onAuthStateChanged, signOut} from "../userApiWrapper/firebaseAuth.ts";
import app from '../firebase'
import {Auth, getAuth, NextOrObserver, User} from "firebase/auth";

const UserContext = createContext({
    isLogin: false,
    email: '',
    handleLogout: () => Promise.resolve(),
});

function UserContextProvider({children, authStateSubscribe = onAuthStateChanged, signOutBeforeHook = signOut}: {
    children: ReactNode,
    authStateSubscribe?: (auth: Auth | undefined, callback: NextOrObserver<User | null>) => void,
    signOutBeforeHook?: (auth?: Auth) => Promise<void>,
}) {
    const [isLogin, setLogin] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        authStateSubscribe(getAuth(app), (user) => {
            if (user) {
                setLogin(true);
                setEmail(user.email || "");
            } else {
                setLogin(false);
            }
        })
    }, []);

    const handleLogout = async () => {
        // firebase logout
        await signOutBeforeHook(getAuth(app))
        // state logout
        setLogin(false);
    }

    const defaultValue = {
        isLogin,
        handleLogout,
        email,
    };

    return (
        <UserContext.Provider value={defaultValue}>
            {children}
        </UserContext.Provider>
    );
}

export {UserContextProvider, UserContext};