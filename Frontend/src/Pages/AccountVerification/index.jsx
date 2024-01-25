import Account_Verification_Input from './Account_Verification_Input';
import Account_Verification_Message from './Account_Verification_Message';
import Account_Verification_Box from './Account_Verification_Box';

function Account_Verification() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Account_Verification_Box>
        <Account_Verification_Message />
        <Account_Verification_Input />
      </Account_Verification_Box>
    </div>
  );
}

export default Account_Verification;
