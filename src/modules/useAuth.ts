import { firebaseAuth } from 'boot/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref } from 'vue';
import useNotify from 'src/modules/useNotify';
import { useRouter } from 'vue-router';

const useAuth = () => {
  const { notifyError, notifySuccess } = useNotify();
  const { push } = useRouter();

  const loadingSignIn = ref(false);

  async function signWithGoogle() {
    try {
      loadingSignIn.value = true;
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      notifySuccess('Successful authorization');
      push('/');
    } catch {
      notifyError('Something went wrong. Please try again.');
    } finally {
      loadingSignIn.value = false;
    }
  }

  return { signWithGoogle };
};

export default useAuth;
