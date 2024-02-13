import Button from '../../UI/button';

function PostAppeal() {
  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div className='bg-white w-full flex items-center gap-2 h-[65px]'>
        <input
          type='text'
          name=''
          id=''
          className='w-full h-[35px] border border-gray-400 px-4 py-2 outline-none'
          placeholder='Appeal this item ..'
        />
        <Button classes='mt-0'>Appeal</Button>
      </div>
    </div>
  );
}

export default PostAppeal;
