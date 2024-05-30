import { Outlet } from 'react-router-dom';
import ItemForm from '../itemForm.jsx';
import Modal from '../../UI/Modal.jsx';
import { IoMdHome } from 'react-icons/io';
import { IoIosAddCircle } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Chat from '../Chat/Chat.jsx';
import Rewards from '../Rewards Coin/Rewards.jsx';
import axiosInstance from '../../Services/Axios-Setup.js';
import { useNavigate } from 'react-router-dom';
import Input from '../../UI/input.jsx';
import Button from '../../UI/button.jsx';
import { FaSearchLocation } from 'react-icons/fa';
import { useState } from 'react';

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  function handleSearchClick() {
    navigate(`/category/?category=${searchQuery}`);
  }

  return (
    <div className='w-[300px] min-h-full fixed bg-white  py-10'>
      <ul className='flex flex-col text-xl text-text_primary'>
        <Link to='/'>
          <li className='py-3 px-7 hover:bg-blue-400 hover:text-white cursor-pointer flex gap-2 items-center'>
            <IoMdHome size={24} />
            Home
          </li>
        </Link>

        <Link to='/my-postings'>
          <li className='py-3 px-7 hover:bg-blue-400 hover:text-white cursor-pointer flex gap-2 items-center'>
            <BsPeopleFill size={24} />
            My Postings
          </li>
        </Link>

        <Modal>
          <Modal.Open opens='posting'>
            <div className='py-3 px-7 hover:bg-blue-400 hover:text-white cursor-pointer flex gap-2 items-center'>
              <IoIosAddCircle size={24} />
              Register Item
            </div>
          </Modal.Open>
          <Modal.Window name='posting'>
            <ItemForm />
          </Modal.Window>
        </Modal>
      </ul>

      <div className='px-7'>
        <Input
          placeholder={'Search by category'}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button
          size='large'
          classes={'flex items-center justify-center gap-2'}
          onClick={handleSearchClick}
        >
          {' '}
          <FaSearchLocation size={18} /> Search
        </Button>
      </div>
    </div>
  );
}

function Layout() {
  const navigate = useNavigate();
  async function handleLogout() {
    await axiosInstance.post('/users/logout');
    navigate('/login');
  }

  function handleGetAllItems() {
    navigate('/all-items');
  }
  return (
    <div>
      <header className=' w-[1465px] flex justify-between items-center fixed left-[42px] z-50 bg-white px-5 py-4 border border-b-[16px] border-[#d3d3d3]'>
        <h2 className='font-logo text-4xl text-blue-400'>Reclamify</h2>
        <div className='flex gap-[40px] font-primary text-[18px] mr-[80px] text-text_primary'>
          <span
            className='cursor-pointer hover:scale-105 transition'
            onClick={() => navigate('/')}
          >
            Nearby Items
          </span>
          <span
            className='cursor-pointer hover:scale-105 transition'
            onClick={handleGetAllItems}
          >
            All Items
          </span>
          <span
            className='cursor-pointer hover:scale-105 transition'
            onClick={() => navigate('found-items')}
          >
            Found Items
          </span>
          <span
            className='cursor-pointer hover:scale-105 transition'
            onClick={() => navigate('lost-items')}
          >
            Lost Items
          </span>
        </div>
        <button
          onClick={handleLogout}
          className='border border-gray-500 hover:opacity-75 px-4 py-2 text-text_primary uppercase rounded text-[16px] tracking-wider'
        >
          Logout
        </button>
      </header>
      <div className='flex gap-7 mx-auto container pt-16'>
        <Sidebar />
        <div className='ml-[318px] max-w-[830px] bg-white min-h-screen'>
          <Outlet />
        </div>

        <div className=' flex flex-col  fixed top-[90px] right-7 w-[300px] h-full bg-white '>
          <Rewards />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Layout;
