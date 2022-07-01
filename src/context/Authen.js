import { createContext, useEffect, useState } from "react";
import { authApp, firestoreApp } from "../config/firebase";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [globalmsg,setGlobalmsg] = useState('');

    const register = (email, password) => {
        return authApp.createUserWithEmailAndPassword(email, password)
    };

    const login = (email, password) => {
        return authApp.signInWithEmailAndPassword(email, password)
    };

    const logout = () => {
        return authApp.signOut();
    };

    const bid = (itemId, price, bids) => {
        if (!currentUser) {
            return setGlobalmsg("You cannot bid please login first");
        }
        const newPrice = Math.floor(price + bids);
        
        const db =  firestoreApp.collection('auctiondb');

        return db.doc(itemId).update({
            curPrice: newPrice,
            curWinner: currentUser.email,
        })
    };

    const endbid =  (itemId) => {
        const db =  firestoreApp.collection('auctiondb');

        return db.doc(itemId).delete();
    };

    useEffect(() => {
        const subscribe = authApp.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false)
        });

        return subscribe;
    }, []);

    useEffect(() => {
        const interval = setTimeout(() => setGlobalmsg(''), 3000);
        return () => clearTimeout(interval)
    }, [globalmsg]);

    return <AuthContext.Provider value={{ currentUser, register, login, logout, bid, endbid, globalmsg }}>
        {!loading && children}
        </AuthContext.Provider>
}