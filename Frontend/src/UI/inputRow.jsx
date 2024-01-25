function inputRow({ label, children }) {
  return (
    <div className='flex gap-4 items-center '>
      <label className='w-[40%] text-lg'>{label}</label>
      {children}
    </div>
  );
}

export default inputRow;
