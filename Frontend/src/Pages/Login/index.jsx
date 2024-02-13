import { RightLayout } from './right-layout';
import { LeftLayout } from './left-layout';

export default function Login() {
  return (
    <section className='bg-white h-screen  flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
      <LeftLayout />
      <RightLayout />
    </section>
  );
}
