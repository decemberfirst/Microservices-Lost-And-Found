/* eslint-disable react/prop-types */
import { IoMdCreate } from 'react-icons/io';
import { RiPinDistanceFill } from 'react-icons/ri';
import { GrStatusInfo } from 'react-icons/gr';
import { FaRegComments } from 'react-icons/fa6';
import Modal from '../../UI/Modal';
import Appeals from '../appeals/Appeals';
import Slider from '../Slider/Slider';

function IndividualPost({ item }) {
  const {
    _id,
    itemName,
    itemDescription,
    itemImages,
    postType,
    registeredBy,
    hasOwnerClaimed,
    distance,
    createdAt,
    lostDate,
    appeals,
  } = item;
  const itemImage = itemImages.map((image) => {
    return image.split(' ').join('%20');
  });
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
              {distance && (
                <RiPinDistanceFill size={14} className='text-red-700' />
              )}
              {distance && distance?.toFixed(1) + ' km away'}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <p className='text-primary italic '>
          {postType === 'FOUND' ? 'FOUND ITEM !' : 'LOST ITEM !'}
        </p>
        <p className='italic text-text_primary'>
          I&apos;ve {postType === 'FOUND' ? 'Found' : 'Lost'} {itemName} on{' '}
          {new Date(lostDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          . If you happen to {postType === 'LOST' ? 'find' : 'be yours'} it or
          have any information, please let me know.
        </p>
        <p className='pt-3 pb-4 font-primary'>{itemDescription}</p>
      </div>
      <div className='py-2 '>
        <Slider images={itemImage} />
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
            <Appeals appeals={appeals} itemId={_id} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default IndividualPost;
