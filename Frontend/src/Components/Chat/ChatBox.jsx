/* eslint-disable react/prop-types */
import Send from './Send';
import Receive from './Receive';
import { IoSend } from 'react-icons/io5';
import { useState, useRef } from 'react';

function ChatBox({ socket, messages, roomName }) {
  const [msg, setMsg] = useState('');
  const ref = useRef();

  function handleInputChange(e) {
    setMsg(e.target.value);
  }

  function handleMsgClick() {
    if (!msg) return ref.current.focus();
    socket.send(
      JSON.stringify({
        type: 'MESSAGE',
        message: msg,
        ROOM_ID: roomName,
      })
    );
    setMsg('');
  }

  return (
    <div className='overflow-scroll relative pt-14'>
      <div className='pt-5 pb-[150px] flex flex-col gap-3'>
        {messages.map((msg, index) => {
          if (msg.role === 'RECEIVER') {
            return <Receive key={index} message={msg.message} />;
          }
          return <Send key={index} message={msg.message} />;
        })}
      </div>
      <div className='fixed bottom-0 pr-3 w-[298px] flex gap-2 items-center justify-between bg-gray-100'>
        <input
          placeholder='Type Messages'
          className='px-3 bg-gray-100 py-2 h-[45px] w-[250px] text-text_primary outline-none border-none italic '
          type='text'
          onChange={handleInputChange}
          ref={ref}
          value={msg}
        />
        <IoSend
          size={32}
          className='text-blue-400'
          cursor={'pointer'}
          onClick={handleMsgClick}
        />
      </div>
    </div>
  );
}

export default ChatBox;
