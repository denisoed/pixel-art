import { boot } from 'quasar/wrappers';
import { firebaseAuth } from 'boot/firebase';
import { useUserStore } from 'src/stores/user';

export default boot(() => {
  const userStore = useUserStore();
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      userStore.setUser({
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
      });
    }
  });
});
