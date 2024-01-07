import { firebaseStore } from 'boot/firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { IArt, IArtPayload } from 'src/interfaces';

const useDB = () => {
  async function fetchArts(): Promise<IArt[]> {
    const artsCollection = collection(firebaseStore, 'arts');
    const artsSnapshot = await getDocs(artsCollection);
    const artsList = artsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data()?.name || '',
      json: doc.data()?.json || '',
    }));
    return artsList;
  }

  async function fetchArt(id: string): Promise<IArt | undefined> {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await getDoc(doc(artsCollection, id));
    return artDoc.data() as IArt;
  }

  async function createArt(art: IArtPayload) {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await addDoc(artsCollection, art);
    return artDoc;
  }

  async function updateArt(id: string, art: IArtPayload) {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await updateDoc(doc(artsCollection, id), { ...art });
    return artDoc;
  }

  async function deleteArt(id: string) {
    const artsCollection = collection(firebaseStore, 'arts');
    const artDoc = await deleteDoc(doc(artsCollection, id));
    return artDoc;
  }

  return {
    fetchArts,
    createArt,
    deleteArt,
    fetchArt,
    updateArt,
  };
};

export default useDB;
