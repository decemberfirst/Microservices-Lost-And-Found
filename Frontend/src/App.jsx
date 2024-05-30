import Account_Verification from './Pages/AccountVerification/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToasterContainer from './Components/Toast/Toaster';
import FilterCategory from './Pages/Filters/CategoryFilter';
import Layout from './Components/Layout/Layout';
import ProtectRoute from './Features/Protect-Route';
import MyPostings from './Pages/MyPostings/MyPostings';
import AllItems from './Pages/Filters/AllItems';
import FoundItems from './Pages/Filters/FoundItems';
import LostItems from './Pages/Filters/LostItems';
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
            <Route path='/all-items' element={<AllItems />} />
            <Route path='/found-items' element={<FoundItems />} />
            <Route path='/lost-items' element={<LostItems />} />
            <Route path='/category/*' element={<FilterCategory />} />
          </Route>
        </Route>
      </Routes>
      <ToasterContainer />
    </BrowserRouter>
  );
}

export default App;
