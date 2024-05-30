import { IoChatboxEllipses } from 'react-icons/io5';
import { IoMdRefresh } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useSocketContext } from '../Context/SocketContext';
import CreateRoom from './CreateRoom';
import ChatBox from './ChatBox';
import { useRef } from 'react';

function Chat() {
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  if (socket) {
    socket.onmessage = function (msg) {
      const data = JSON.parse(msg.data);
      console.log(data);
      if (data.type === 'ROOM_CREATED') {
        console.log('Roomcreated');
        setRoomName(data.ROOM_ID);
      } else if (data.type === 'MESSAGE') {
        setMessages([...messages, data]);
      } else if (data.type === 'JOINED_ROOM') {
        setRoomName(data.ROOM_ID);
      }
    };
  }

  function onCreateRoom() {
    socket.send(
      JSON.stringify({
        type: 'CREATE_ROOM',
        from: 'ROHAN',
      })
    );
  }

  function handleRefreshClick() {
    window.location.href = '/';
  }

  return (
    <div
      ref={ref}
      className='bg-white h-full border border-t-[14px] border-[#D3D3D3] overflow-scroll relative'
    >
      <h1 className='fixed w-[298px] z-30 bg-blue-500 text-white px-4 flex gap-4 items-center py-2 font-primary uppercase italic text-md font-extrabold'>
        <IoChatboxEllipses size={30} className='text-white' />
        {roomName ? `Room ${roomName}` : 'Join Personal Chat'}
        <IoMdRefresh
          size={18}
          cursor={'pointer'}
          onClick={handleRefreshClick}
        />
      </h1>
      {!roomName && <CreateRoom onCreateRoom={onCreateRoom} socket={socket} />}
      {roomName && (
        <ChatBox socket={socket} messages={messages} roomName={roomName} />
      )}
    </div>
  );
}

export default Chat;
