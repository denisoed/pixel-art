import { firebaseStore } from 'boot/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { IArt, IArtPayload } from 'src/interfaces';

const useDB = () => {
  async function getArts(): Promise<IArt[]> {
    const artsCollection = collection(firebaseStore, 'arts');
    const artsSnapshot = await getDocs(artsCollection);
    const artsList = artsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data()?.name || '',
    }));
    return artsList;
  }

  async function createArt(art: IArtPayload) {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await addDoc(artsCollection, art);
    return artDoc;
  }

  return {
    getArts,
    createArt,
  };
};

export default useDB;
