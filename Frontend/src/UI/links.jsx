/* eslint-disable react/prop-types */
export default function Links(props) {
  const { children, onClick } = props;
  return (
    <a
      className='text-red-600 hover:underline hover:underline-offset-4 under  text-[14px] md:text-[16px] lg:text-[16px]'
      onClick={onClick}
    >
      {children}
    </a>
  );
}
