import { api } from 'src/boot/axios';

const useAuthApi = () => {
  async function connect(url: string) {
    const response = await api.get(url);
    return response;
  }

  async function me() {
    const response = await api.get('/api/users/me');
    return response;
  }

  return {
    connect,
    me,
  };
};

export default useAuthApi;
