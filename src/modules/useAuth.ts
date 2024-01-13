import { LocalStorage } from 'quasar';
import { firebaseAuth } from 'boot/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref } from 'vue';
import useNotify from 'src/modules/useNotify';
import { useRouter } from 'vue-router';
import { ACCESS_TOKEN_KEY } from 'src/config';

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
      push('/arts');
    } catch {
      notifyError('Something went wrong. Please try again.');
    } finally {
      loadingSignIn.value = false;
    }
  }

  function signOut() {
    LocalStorage.remove(ACCESS_TOKEN_KEY);
    push('/');
  }

  return { signWithGoogle, signOut, loadingSignIn };
};

export default useAuth;
