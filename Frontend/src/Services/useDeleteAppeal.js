import { useMutation } from '@tanstack/react-query';
import axios from './Axios-Setup';
import toast from 'react-hot-toast';
import queryClient from './queryClient';

export default function useDeleteItem() {
  const { mutate: deleteAppeal, isPending: isLoading } = useMutation({
    mutationFn: (params) => {
      return axios.delete(`/items/${params.itemId}/delete/${params.appealId}`);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries('items');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { deleteAppeal, isLoading };
}
