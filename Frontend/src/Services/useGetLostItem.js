import { useQuery } from '@tanstack/react-query';
import axios from './Axios-Setup';

export default function useGetLostItem() {
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['all-items'],
    queryFn: async () => {
      return await axios.get('/items/filter/lost-items');
    },
  });

  return { items: data?.data, isFetching };
}
