import { api } from 'src/boot/axios';
import { IArtPayload, IArt } from 'src/interfaces';

const useArtsApi = () => {
  async function fetchArts(): Promise<IArt[] | []> {
    const response = await api.get('/api/arts');
    return response.data.data;
  }

  async function createArt(art: IArtPayload): Promise<IArt> {
    const response = await api.post('/api/arts', { data: art });
    return response.data.data;
  }

  return {
    fetchArts,
    createArt,
  };
};

export default useArtsApi;
