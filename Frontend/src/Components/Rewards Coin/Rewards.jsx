import { BsCashCoin } from 'react-icons/bs';

function Rewards() {
  return (
    <div className='flex items-center justify-center h-[400px]'>
      <h1 className='font-primary text-text_primary text-xl italic uppercase text-center font-semibold flex flex-col items-center gap-5 px-3'>
        <BsCashCoin size={50} className='text-green-500' />
        No Reward Coins Available
      </h1>
    </div>
  );
}

export default Rewards;
