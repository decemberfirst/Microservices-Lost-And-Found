/* eslint-disable react/prop-types */
export default function Button(props) {
  const { children, onClick, size, type, isLoading, classes } = props;
  return (
    <button
      disabled={isLoading}
      className={`mt-4 bg-secondary hover:opacity-75 px-4 py-2 text-white uppercase rounded text-[16px] tracking-wider ${
        size == 'large' ? 'w-full' : ''
      } + ${classes}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
