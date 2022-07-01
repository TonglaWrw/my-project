import { useState } from "react";
import { firestoreApp, storageApp, timestamp } from "../config/firebase";

const storage = data => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(null);

    useState(() => {
        const storageRef = storageApp.ref(data.image.name);
        const collectionRef = firestoreApp.collection('auctiondb');

        storageRef.put(data.image).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        },
        (err) => {
            console.log(err)
        }, async () => {
            const imgUrl = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            delete data.image;
            await collectionRef.add({ ...data, createdAt, imgUrl });
            setIsComplete(true);
        }
        );
    }, [data]);

    return { progress, isComplete }
}

export default storage;