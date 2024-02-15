import { useMutation } from '@tanstack/react-query';
import axios from './Axios-Setup';
import toast from 'react-hot-toast';

export default function usePostAppeal() {
  const { mutate: postAppeal, isPending: isLoading } = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return axios.post(`/items/${data.itemId}/appeal`, {
        appealDescription: data.appeal,
      });
    },

    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { postAppeal, isLoading };
}
