/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
function CreateRoom({ onCreateRoom, socket }) {
  const queryClient = useQueryClient();
  const [roomId, setRoomId] = useState(null);
  const inputRef = useRef();
  const buttonRef = useRef();

  function handleRoomIdChange(e) {
    setRoomId(e.target.value);
  }

  function onJoinRoom() {
    socket.send(
      JSON.stringify({
        type: 'JOIN_ROOM',
        ROOM_ID: roomId,
        myID: queryClient.getQueryData('user').userId,
      })
    );
  }

  return (
    <div className='flex items-center justify-center h-full px-7 flex-col gap-5'>
      <div className='flex flex-col gap-3 w-full'>
        <input
          type='text'
          placeholder='Enter Room Name'
          onChange={handleRoomIdChange}
          ref={inputRef}
          className='w-full outline-none px-3 py-1 border-b border-gray-600 italic'
        />
        <button
          className='bg-primary text-white px-3 py-2 font-primary  cursor-pointer w-full'
          onClick={onJoinRoom}
          ref={buttonRef}
        >
          Join Room
        </button>
      </div>
      <button
        className=' bg-green-500 text-white px-3 py-2 font-primary  cursor-pointer w-full'
        onClick={onCreateRoom}
      >
        Create Room
      </button>
    </div>
  );
}

export default CreateRoom;
