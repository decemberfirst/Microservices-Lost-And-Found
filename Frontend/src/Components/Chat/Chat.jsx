import { IoChatboxEllipses } from 'react-icons/io5';

function Chat() {
  return (
    <div className='bg-white h-full border border-t-[14px] border-[#D3D3D3]'>
      <h1 className='bg-blue-500 text-white px-4 flex justify-between items-center py-2 font-primary uppercase italic text-md font-extrabold'>
        <IoChatboxEllipses size={30} className='text-white' />
        Join Personal Chat Room
      </h1>
    </div>
  );
}

export default Chat;
