import IndividualPost from '../../Components/individualPost/index.jsx';
import ItemList from '../../Components/Items/ItemList.jsx';
import useGetItems from '../../Services/useItem.js';
import { useState } from 'react';

export default function Home() {
  const { items } = useGetItems();
  const [openId, setOpenId] = useState(null);

  const close = () => setOpenId(null);

  if (items?.length == 0)
    return (
      <div className='container italic text-2xl px-10 py-10 bg-white w-[830px] flex justify-center items-center min-h-screen '>
        <span>No Items To Show ..</span>
      </div>
    );

  return (
    <ItemList>
      <div className='flex flex-col gap-8'>
        {items?.map((item) => {
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
