import LeftLayout from './left-layout';
import RightLayout from './right-layout';

export default function Signup() {
  return (
    <div className='flex flex-col lg:flex-row h-screen items-center justify-center'>
      <LeftLayout />
      <RightLayout />
    </div>
  );
}
