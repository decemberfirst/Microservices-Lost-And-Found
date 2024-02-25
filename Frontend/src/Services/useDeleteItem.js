import { useMutation } from '@tanstack/react-query';
import axios from './Axios-Setup';
import toast from 'react-hot-toast';
import queryClient from './queryClient';

export default function useDeleteItem() {
  const { mutate: deleteItem, isPending: isLoading } = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/items/${id}/delete`);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries('items');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { deleteItem, isLoading };
}
