import { boot } from 'quasar/wrappers';
import useAuthApi from 'src/api/useAuthApi';
import { useUserStore } from 'src/stores/user';

export default boot(async () => {
  const userStore = useUserStore();
  const { me } = useAuthApi();
  try {
    const { data, status } = await me();
    if (status === 200) {
      userStore.setUser(data);
    }
  } catch (error) {
    console.error(error);
  }
});
