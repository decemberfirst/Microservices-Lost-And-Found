/* eslint-disable react/prop-types */
import { FaImage } from 'react-icons/fa';

function FileInput({ file, setFile }) {
  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  return (
    <div className='relative px-4 py-2 w-full mt-1'>
      <div
        className={`${
          file?.length > 0 ? 'opacity-75' : ''
        } bg-primary absolute top-0 left-[4px] px-4 py-2 text-white text-text_primary cursor-pointer flex gap-3 items-center`}
      >
        <FaImage className='inline-block' size={18} />
        {file?.length == 1
          ? 'Image selected'
          : file?.length > 1
          ? 'Images selected'
          : 'Select Image'}
      </div>
      <input
        type='file'
        name=''
        id=''
        multiple
        onChange={handleFileChange}
        className='scale-150 w-[100px] cursor-pointer opacity-0'
      />
    </div>
  );
}

export default FileInput;
