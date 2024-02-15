/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';

function Slider({ images }) {
  const [index, setIndex] = useState(0);

  // prefetch next image and cache it
  if (images[index + 1]) {
    new Image().src = images[index + 1];
  }

  return (
    <div className='relative'>
      {images?.length > 1 && (
        <div className='flex justify-between items-center absolute w-full inset-0 px-2 text-gray-400'>
          <button
            onClick={() => setIndex((prev) => prev - 1)}
            disabled={index === 0}
            className='slider-button hover:text-primary'
          >
            <FaArrowCircleLeft size={30} />
          </button>

          <button
            onClick={() => setIndex((prev) => prev + 1)}
            disabled={index === images.length - 1}
            className='slider-button hover:text-primary'
          >
            <FaArrowCircleRight size={30} />
          </button>
        </div>
      )}
      <div className='flex justify-center items-center'>
        <div>
          <img src={images[index]} alt='' className='object-cover' />
        </div>
      </div>
    </div>
  );
}

export default Slider;
