import useGetAllItems from '../../Services/useGetAllItems';
import IndividualPost from '../../Components/individualPost';
import ItemList from '../../Components/Items/ItemList';
import { useState } from 'react';

function AllItems() {
  const { allItems } = useGetAllItems();
  const [openId, setOpenId] = useState(null);
  const close = () => setOpenId(null);

  if (allItems?.length == 0)
    return (
      <div className='container italic text-2xl px-10 py-10 bg-white w-[830px] flex justify-center items-center min-h-screen '>
        <span>No Items To Show ..</span>
      </div>
    );
  return (
    <ItemList>
      <div className='flex flex-col gap-8'>
        {allItems?.map((item) => {
          return (
            <IndividualPost
              key={item.id}
              item={item}
              operations={{ openId, close, setOpenId }}
            />
          );
        })}
      </div>
    </ItemList>
  );
}

export default AllItems;
