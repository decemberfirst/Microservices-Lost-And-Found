/* eslint-disable react/prop-types */
function Input({
  onChange,
  placeholder,
  type,
  errormsg,
  formHook,
  className,
  ...rest
}) {
  return (
    <div className='w-full'>
      <span className='text-[16px] text-red-500 font-light pb-2 block'>
        {errormsg && errormsg.message}
      </span>
      <input
        className={`text-sm text-text_primary mb-4 w-full px-4 py-2 border border-solid border-gray-300 rounded ${
          errormsg?.message
            ? 'border-red-500'
            : 'border-gray-300 focus:outline-none '
        } + ${className}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...formHook}
        {...rest}
      />
    </div>
  );
}

export default Input;
