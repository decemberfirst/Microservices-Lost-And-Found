import { useMutation } from '@tanstack/react-query';
import axios from './Axios-Setup';
import toast from 'react-hot-toast';
import queryClient from './queryClient';

export default function usePostItem() {
  const { mutate: postItem, isPending: isLoading } = useMutation({
    mutationFn: (data) => axios.post('/items/register', data),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries('items');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { postItem, isLoading };
}
