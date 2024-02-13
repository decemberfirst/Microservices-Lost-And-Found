import LeftLayout from './left-layout';
import RightLayout from './right-layout';

export default function Signup() {
  return (
    <div className='bg-white flex flex-col lg:flex-row h-screen items-center justify-center'>
      <LeftLayout />
      <RightLayout />
    </div>
  );
}
