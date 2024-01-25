/* eslint-disable react/prop-types */
function FileInput({ label }) {
  return (
    <div className='relative px-4 py-2 w-full mt-1'>
      <div className='bg-primary absolute top-0 left-[4px] px-4 py-2 text-white text-text_primary cursor-pointer'>
        {label}
      </div>
      <input
        type='file'
        name=''
        id=''
        className='scale-150 w-[100px] cursor-pointer opacity-0'
      />
    </div>
  );
}

export default FileInput;
