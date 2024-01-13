import { api } from 'src/boot/axios';
import { IArt } from 'src/interfaces';

const useArtsApi = () => {
  async function fetchArts(): Promise<IArt[] | []> {
    const response = await api.get('/api/arts');
    return response.data.data;
  }

  return {
    fetchArts,
  };
};

export default useArtsApi;
