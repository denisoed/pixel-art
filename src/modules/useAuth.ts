import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';
import { ACCESS_TOKEN_KEY } from 'src/config';

const useAuth = () => {
  const { push } = useRouter();

  function signOut() {
    LocalStorage.remove(ACCESS_TOKEN_KEY);
    push('/');
  }

  return { signOut };
};

export default useAuth;
