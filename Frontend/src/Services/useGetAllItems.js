import { useQuery } from '@tanstack/react-query';
import axios from './Axios-Setup';

export default function useGetAllItems() {
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['all-items'],
    queryFn: async () => {
      return await axios.get('/items/filter/all');
    },
  });

  return { allItems: data?.data, isFetching };
}
