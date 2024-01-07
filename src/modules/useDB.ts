import { firebaseStore } from 'boot/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { IArt, IArtPayload } from 'src/interfaces';

const useDB = () => {
  async function getArts(): Promise<IArt[]> {
    const artsCollection = collection(firebaseStore, 'arts');
    const artsSnapshot = await getDocs(artsCollection);
    const artsList = artsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data()?.name || '',
      json: doc.data()?.json || '',
    }));
    return artsList;
  }

  async function createArt(art: IArtPayload) {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await addDoc(artsCollection, art);
    return artDoc;
  }

  async function deleteArt(id: string) {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await deleteDoc(doc(artsCollection, id));
    return artDoc;
  }

  return {
    getArts,
    createArt,
    deleteArt,
  };
};

export default useDB;
