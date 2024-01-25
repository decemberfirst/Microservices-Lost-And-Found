import { MdVerified } from 'react-icons/md';

function Account_Verification_Message() {
  return (
    <>
      <div className='flex items-center flex-col pb-5'>
        <MdVerified size={'62px'} color='red' className='mb-3' />
        <h1 className='text-4xl font-primary'>Enter Verification Token</h1>
      </div>
      <p className='pb-2 text-text_primary'>
        Uh-oh! It seems like your account is feeling a bit shy and has not
        introduced itself properly yet. Enter the magical verification token
        below to unlock the hidden wonders of our protected route!
      </p>
    </>
  );
}

export default Account_Verification_Message;
