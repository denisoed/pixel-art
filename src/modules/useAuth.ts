import {
  firebaseAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'boot/firebase';

const useAuth = () => {
  async function signWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(firebaseAuth, provider);
      return response;
    } catch (error: any) {
      return error;
    }
  }

  return { signWithGoogle };
};

export default useAuth;
