/* eslint-disable react/prop-types */
import IndividualAppeal from './IndividualAppeal';
import PostAppeal from './PostAppeal';

function Appeals({ appeals, itemId }) {
  return (
    <div className='relative pb-[80px]'>
      <h1 className='fixed bg-white w-[650px] font-bold text-2xl text-text_primary pb-3 border-b border-primary tracking-wide border-gray-300 uppercase'>
        Item Appeals
      </h1>
      <div className='w-[650px] h-[350px] overflow-scroll'>
        <div className='pt-[70px] flex flex-col gap-5'>
          {appeals?.map((appeal) => (
            <IndividualAppeal key={appeal._id} appeal={appeal} />
          ))}
        </div>
        <PostAppeal itemId={itemId} />
      </div>
    </div>
  );
}

export default Appeals;
