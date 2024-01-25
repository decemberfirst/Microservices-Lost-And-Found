import Account_Verification from './Pages/AccountVerification/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToasterContainer from './Components/Toast/Toaster';
import ProtectRoute from './Features/Protect-Route';
import Signup from './Pages/Signup/index';
import Login from './Pages/Login/index';
import Home from './Pages/Home/index';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify' element={<Account_Verification />} />

        <Route element={<ProtectRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      <ToasterContainer />
    </BrowserRouter>
  );
}

export default App;
