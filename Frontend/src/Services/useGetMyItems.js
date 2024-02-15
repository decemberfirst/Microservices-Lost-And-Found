import { useQuery } from '@tanstack/react-query';
import axios from './Axios-Setup';

export default function useGetMyItems() {
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['my-items'],
    queryFn: async () => {
      return await axios.get('/items/my-items');
    },
  });

  return { userItems: data?.data, isFetching };
}
