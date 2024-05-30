// /:itemId/accept/:appealId

import { useMutation } from '@tanstack/react-query';
import axios from './Axios-Setup';
import toast from 'react-hot-toast';
import queryClient from './queryClient';
import { useNavigate } from 'react-router-dom';

export default function useAcceptAppeal() {
  const navigate = useNavigate();
  const { mutate: acceptAppeal, isPending: isLoading } = useMutation({
    mutationFn: (params) => {
      return axios.post(`/items/${params.itemId}/accept/${params.appealId}`);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries('items');
      navigate('/all-items');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { acceptAppeal, isLoading };
}
