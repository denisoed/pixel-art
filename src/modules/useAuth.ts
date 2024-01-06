import {
  firebaseAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'boot/firebase';
import {} from 'firebase/auth';
import { ref } from 'vue';
import useNotify from 'src/modules/useNotify';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user';

const useAuth = () => {
  const userStore = useUserStore();
  const { notifyError, notifySuccess } = useNotify();
  const { push } = useRouter();

  const loadingSignIn = ref(false);

  async function signWithGoogle() {
    try {
      loadingSignIn.value = true;
      const provider = new GoogleAuthProvider();
      const response: any = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const accessToken = credential?.accessToken;
      if (!accessToken)
        throw new Error('Something went wrong. Please try again.');
      userStore.setAccessToken(accessToken);
      userStore.setUser({
        photoURL: response.user.photoURL,
        displayName: response.user.displayName,
        email: response.user.email,
      });
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
