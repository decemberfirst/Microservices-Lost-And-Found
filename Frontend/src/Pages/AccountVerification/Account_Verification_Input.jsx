import Input from '../../UI/input';
import { useState } from 'react';
import useVerifyAccount from '../../Services/Verify-Account';
import Button from '../../UI/button';

function Account_Verification_Input() {
  const [token, setToken] = useState('');
  const { isLoading, verifyAccount } = useVerifyAccount();

  function handleTokenChange(e) {
    setToken(e.target.value);
  }

  function handleTokenSubmit() {
    verifyAccount({ token });
  }
  return (
    <>
      <Input
        placeholder={'Enter Verification Token '}
        onChange={handleTokenChange}
      />
      <Button size='large' onClick={handleTokenSubmit} disabled={isLoading}>
        Verify Account
      </Button>
    </>
  );
}

export default Account_Verification_Input;
