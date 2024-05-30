import { BsCashCoin } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Services/Axios-Setup';

function Rewards() {
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    async function fetchRewards() {
      try {
        const response = await axiosInstance.get('/items/tokens');
        console.log(response.data);
        setRewards(response.data.tokens);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRewards();
  });

  return (
    <div className='flex items-center justify-center h-[400px]'>
      <h1 className='font-primary text-text_primary text-xl italic uppercase text-center font-semibold flex flex-col items-center gap-5 px-3'>
        <BsCashCoin size={50} className='text-green-500' />
        {!rewards ? 'No' : rewards} Reward Tokens Available
      </h1>
    </div>
  );
}

export default Rewards;
