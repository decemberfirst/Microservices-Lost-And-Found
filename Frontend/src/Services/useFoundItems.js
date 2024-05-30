import { useQuery } from '@tanstack/react-query';
import axios from './Axios-Setup';

export default function useGetFoundItems() {
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['all-items'],
    queryFn: async () => {
      return await axios.get('/items/filter/found-items');
    },
  });

  return { items: data?.data, isFetching };
}
