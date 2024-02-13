/* eslint-disable react/prop-types */
import { IoMdCreate } from 'react-icons/io';
import { RiPinDistanceFill } from 'react-icons/ri';
import { GrStatusInfo } from 'react-icons/gr';
import { FaRegComments } from 'react-icons/fa6';
import Modal from '../../UI/Modal';
import Appeals from '../appeals/Appeals';

function IndividualPost({ item }) {
  const {
    itemName,
    itemCategory,
    itemDescription,
    itemImages,
    postType,
    registeredBy,
    hasOwnerClaimed,
    distance,
    createdAt,
  } = item;
  console.log(itemName);
  return (
    <div className='max-w-[750px] w-full'>
      <div className='flex gap-4 items-center'>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
          <img
            src='https://img.freepik.com/premium-photo/portrait-real-black-african-man-with-no-expression-id-passport-photo_262288-7508.jpg'
            alt=''
          />
        </div>
        <div>
          <h1 className='text-[18px] font-bold text-text_primary'>
            {registeredBy?.username}
          </h1>
          <div className='flex gap-3'>
            <span className='flex gap-1 items-center text-gray-500 font-primary text-[14px]'>
              <IoMdCreate size={14} className='text-green-600' />
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className='flex gap-1 items-center text-gray-500 font-primary text-[14px]'>
              <RiPinDistanceFill size={14} className='text-red-700' />
              {distance.toFixed(1)}km away
            </span>
          </div>
        </div>
      </div>
      <p className='pt-2 pb-4'>{itemDescription}</p>
      <div className='py-2'>
        <img src={`${itemImages[0]}`} alt='' />
      </div>
      <div className=' border-[1px] px-2 py-3 border-secondary flex justify-between'>
        <span className='flex gap-2 items-center font-bold text-gray-500 font-primary'>
          <GrStatusInfo size={24} className='text-primary' />
          {hasOwnerClaimed ? 'Claimed' : 'Not Claimed'}
        </span>
        <Modal>
          <Modal.Open opens='appeals'>
            <span className='flex gap-2 items-center cursor-pointer font-bold text-gray-500'>
              <FaRegComments size={24} className='text-primary' />
              Appeals
            </span>
          </Modal.Open>
          <Modal.Window name='appeals'>
            <Appeals />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default IndividualPost;
