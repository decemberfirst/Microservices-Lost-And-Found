import { useQuery } from '@tanstack/react-query';
import axios from './Axios-Setup';

export default function useGetCategoryFilter({ category }) {
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['categoryFilter', category],
    queryFn: async () => {
      return await axios.get('/items/categoryfilter/' + category);
    },
  });

  return { filterItems: data?.data, isFetching };
}
