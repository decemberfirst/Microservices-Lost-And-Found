import IndividualPost from '../../Components/individualPost';
import ItemList from '../../Components/Items/ItemList';
import { useState } from 'react';
import useGetCategoryFilter from '../../Services/useGetCategoryFilter';
import { useSearchParams } from 'react-router-dom';

function FilterCategory() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { filterItems } = useGetCategoryFilter({ category });
  const [openId, setOpenId] = useState(null);
  const close = () => setOpenId(null);

  if (filterItems?.length == 0)
    return (
      <div className='container italic text-2xl px-10 py-10 bg-white w-[830px] flex justify-center items-center min-h-screen '>
        <span>No Items To Show ..</span>
      </div>
    );
  return (
    <ItemList>
      <div className='flex flex-col gap-8'>
        {filterItems?.map((item) => {
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

export default FilterCategory;
