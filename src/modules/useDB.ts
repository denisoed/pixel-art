import { firebaseStore } from 'boot/firebase';
import { collection, getDocs } from 'firebase/firestore';

const useDB = () => {
  async function getArts() {
    const artsCollection = collection(firebaseStore, 'arts');
    const artsSnapshot = await getDocs(artsCollection);
    const artsList = artsSnapshot.docs.map((doc) => doc.data());
    return artsList;
  }

  return {
    getArts,
  };
};

export default useDB;
