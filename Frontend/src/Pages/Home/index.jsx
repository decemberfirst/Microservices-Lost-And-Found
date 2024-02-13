import IndividualPost from '../../Components/individualPost/index.jsx';
import useGetItems from '../../Services/useItem.js';

export default function Home() {
  const { items } = useGetItems();
  console.log(items);
  return (
    <div className='container px-10 py-10 bg-white'>
      <div className='flex flex-col gap-8'>
        {items?.map((item) => {
          return <IndividualPost key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
