/* eslint-disable react/prop-types */
import Button from '../../UI/button';
import usePostAppeal from '../../Services/PostAppea';
import { useState } from 'react';
import { useRef } from 'react';

function PostAppeal({ itemId }) {
  const { postAppeal, isLoading } = usePostAppeal();
  const [appeal, setAppeal] = useState('');
  const inputRef = useRef();

  const handleClick = () => {
    if (!appeal) {
      return inputRef.current.focus();
    }
    postAppeal({
      itemId,
      appeal,
    });
    setAppeal('');
  };

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div className='bg-white  flex items-center justify-between gap-2 h-[65px]'>
        <input
          type='text'
          name=''
          id=''
          className='w-full h-[35px] border border-gray-400 px-4 py-2 outline-none'
          placeholder='Appeal this item ..'
          onChange={(e) => setAppeal(e.target.value)}
          value={appeal}
          ref={inputRef}
        />
        <Button classes='mt-0' onClick={handleClick} disabled={isLoading}>
          Appeal
        </Button>
      </div>
    </div>
  );
}

export default PostAppeal;
