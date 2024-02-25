import { useEffect, useState } from 'react';
import axios from '../../Services/Axios-Setup';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function ProtectRoute() {
  const [isAuth, setIsAuth] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    async function checkLog() {
      try {
        const resopnse = await axios.post('/users/auto_login');
        queryClient.setQueryData('user', resopnse.data);
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    }

    checkLog();
  }, []);

  return isAuth ? <Outlet /> : <Navigate to='/login' replace={true} />;
}
