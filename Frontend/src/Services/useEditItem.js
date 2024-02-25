import { useMutation } from '@tanstack/react-query';
import axios from './Axios-Setup';
import toast from 'react-hot-toast';
import queryClient from './queryClient';

export default function useEditItem() {
  const { mutate: editItem, isPending: isLoading } = useMutation({
    mutationFn: (data) => {
      return axios.put(`/items/${data._id}/edit`, data);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries('items');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { editItem, isLoading };
}
