import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const getCardFromFirebase = async (id) => {
    try {
        const docRef = doc(firestore, 'cards', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching card details:", error);
        return false;
    }
}

export {
    getCardFromFirebase,
};
