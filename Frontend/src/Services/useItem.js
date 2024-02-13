import { useQuery } from '@tanstack/react-query';
import axios from './Axios-Setup';

export default function useGetItems() {
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      return await axios.get('/items/all');
    },
  });

  return { items: data?.data, isFetching };
}
