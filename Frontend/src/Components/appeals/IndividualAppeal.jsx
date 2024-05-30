import { SlOptions } from 'react-icons/sl';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteItem from '../../Services/useDeleteAppeal';
import useAcceptAppeal from '../../Services/useAcceptAppeal';
import { useSocketContext } from '../Context/SocketContext';

/* eslint-disable react/prop-types */
function IndividualAppeal({
  appeal,
  itemOwner,
  itemId,
  operations,
  closeModal,
}) {
  const { appealDescription, appealedBy, _id } = appeal;
  const { acceptAppeal } = useAcceptAppeal();
  const { deleteAppeal } = useDeleteItem();
  const { socket } = useSocketContext();
  const { openId, setOpenId } = operations;
  const queryClient = useQueryClient();

  function toggleMenu() {
    setOpenId(openId == _id ? null : _id);
  }

  function deleteAppealHandler() {
    deleteAppeal({ itemId: itemId, appealId: _id });
  }

  function acceptAppealHandler() {
    acceptAppeal({ itemId: itemId, appealId: _id });
  }

  function handleMessageClick() {
    socket.send(
      JSON.stringify({
        type: 'CREATE_ROOM',
        targetID: appealedBy._id,
      })
    );
    closeModal();
  }

  return (
    <div className='max-w-[500px] '>
      <div className='flex items-center gap-2 font-primary text-text_primary'>
        <div className='w-[40px] h-[35px] rounded-full overflow-hidden'>
          <img
            src={`https://ui-avatars.com/api/length=1?name=${appealedBy?.username}?rounded=true`}
            alt=''
          />
        </div>
        <div className='flex justify-between w-full items-center'>
          <h2>{appealedBy.username}</h2>
          {itemOwner === queryClient?.getQueryData('user')?.userId && (
            <span
              className='cursor-pointer block relative '
              style={{ zIndex: 999 }}
            >
              <SlOptions
                className='text-text_primary '
                size={18}
                onClick={toggleMenu}
              />
              {openId == _id && (
                <ul className='absolute top-4 -right-2 shadow-md '>
                  <li
                    onClick={deleteAppealHandler}
                    className='px-4 py-[1px] hover:bg-gray-400 hover:text-white flex gap-1 items-center'
                  >
                    Delete
                  </li>
                  <li
                    className='px-4 py-[1px] hover:bg-gray-400 hover:text-white flex gap-3 items-center'
                    onClick={acceptAppealHandler}
                  >
                    Accept
                  </li>
                  <li
                    className='px-4 py-[1px] hover:bg-gray-400 hover:text-white flex gap-3 items-center'
                    onClick={handleMessageClick}
                  >
                    Message
                  </li>
                </ul>
              )}
            </span>
          )}
        </div>
      </div>
      <p className='pt-2 w-[400px] break-words'>{appealDescription}</p>
    </div>
  );
}

export default IndividualAppeal;
