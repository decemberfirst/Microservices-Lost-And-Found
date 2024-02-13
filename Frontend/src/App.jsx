import Account_Verification from './Pages/AccountVerification/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToasterContainer from './Components/Toast/Toaster';
import Layout from './Components/Layout/Layout';
import ProtectRoute from './Features/Protect-Route';
import MyPostings from './Pages/MyPostings/MyPostings';
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
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/my-postings' element={<MyPostings />} />
          </Route>
        </Route>
      </Routes>
      <ToasterContainer />
    </BrowserRouter>
  );
}

export default App;
