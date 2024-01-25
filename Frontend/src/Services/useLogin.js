import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from './Axios-Setup';

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (data) => axios.post('/users/login', data),
    onSuccess: (res) => {
      navigate('/');
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      if (error.response.data.isVerified === false) navigate('/verify');
    },
  });
  return { login, isLoading };
}
