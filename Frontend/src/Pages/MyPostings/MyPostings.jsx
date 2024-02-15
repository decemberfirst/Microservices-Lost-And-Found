import useGetMyItems from '../../Services/useGetMyItems';
import IndividualItems from '../../Components/individualPost/index';

function MyPostings() {
  const { userItems } = useGetMyItems();
  return (
    <div className='px-8 py-10'>
      <div className='flex flex-wrap justify-center px-3 gap-8'>
        {userItems?.map((item) => (
          <IndividualItems key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MyPostings;
