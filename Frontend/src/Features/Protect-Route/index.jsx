import { useEffect, useState } from 'react';
import axios from '../../Services/Axios-Setup';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectRoute() {
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    async function checkLog() {
      try {
        await axios.post('/users/auto_login');
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    }

    checkLog();
  }, []);

  return isAuth ? <Outlet /> : <Navigate to='/login' replace={true} />;
}
