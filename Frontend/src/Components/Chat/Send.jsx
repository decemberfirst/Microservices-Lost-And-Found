/* eslint-disable react/prop-types */
function Send({ message }) {
  return (
    <div className='flex justify-start items-center w-full mt-2'>
      <div className='px-3  bg-orange-400 text-white  py-1 max-w-[200px]   text-[18px] text-text_primary font-primary text-start break-words'>
        {message}
      </div>
    </div>
  );
}

export default Send;
