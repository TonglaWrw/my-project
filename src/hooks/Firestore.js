import { useEffect, useState } from 'react'
import { firestoreApp } from '../config/firebase';

export const Firestore = (collection) => {
    const [docs,setDocs] = useState([]);

    useEffect(() => {
        const subscribe = firestoreApp.collection(collection).onSnapshot((snap) => {
            let document = [];
            snap.forEach((doc) => {
                document.push({...doc.data(), id: doc.id})
            });

            setDocs(document);
        });
        return () => subscribe();
    }, [collection]);
  return { docs };
  
}
