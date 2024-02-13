import IndividualAppeal from './IndividualAppeal';
import PostAppeal from './PostAppeal';

const testAppeals = [
  {
    id: 1,
    username: 'John Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
  {
    id: 2,
    username: 'Jane Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
  {
    id: 33,
    username: 'John Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
  {
    id: 34,
    username: 'John Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
  {
    id: 34,
    username: 'John Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
  {
    id: 34,
    username: 'John Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
  {
    id: 34,
    username: 'John Doe',
    createdAt: '2021-10-10',
    distance: 5,
    description: 'This is a test description',
  },
];

function Appeals() {
  return (
    <div className='relative pb-[80px]'>
      <h1 className='fixed bg-white w-[650px] font-bold text-2xl text-text_primary pb-3 border-b border-primary tracking-wide border-gray-300 uppercase'>
        Item Appeals
      </h1>
      <div className='w-[650px] h-[350px] overflow-scroll'>
        <div className='pt-[70px] flex flex-col gap-5'>
          {testAppeals.map((appeal) => (
            <IndividualAppeal key={appeal.id} appeal={appeal} />
          ))}
        </div>
        <PostAppeal />
      </div>
    </div>
  );
}

export default Appeals;
