import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from './Axios-Setup';

export default function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: (data) => axios.post('/users/signup', data),
    onSuccess: (res) => {
      navigate('/login');
      toast.success(res.data.message);
    },
    onError: (error) => {
      if (error.response.data.message.startsWith('Duplicate')) {
        const msg = error.response.data.message.split(',')[0];
        toast.error(msg);
        return;
      }
      toast.error(error.response.data.message);
    },
  });
  return { signup, isLoading };
}
