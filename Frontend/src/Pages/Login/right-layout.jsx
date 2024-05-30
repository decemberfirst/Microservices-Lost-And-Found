// import { useNavigate } from 'react-router-dom';
import useLogin from '../../Services/useLogin';
import { useForm } from 'react-hook-form';
import Button from '../../UI/button';
import Input from '../../UI/input';
import Links from '../../UI/links';

export function RightLayout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();
  const { isLoading, login } = useLogin();

  function onSubmit(credentials) {
    login(credentials);
  }

  return (
    <div className='md:w-1/3 max-w-sm'>
      <h2 className='text-xl lg:text-3xl text-center pb-4 md:pb-6 font-bold'>
        Login Your Account
      </h2>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Enter your email'
          type='text'
          label='Email'
          formHook={register('email', {
            required: 'Please enter email',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Please enter valid email',
            },
          })}
          errormsg={errors.email}
        />

        <Input
          placeholder='Enter your password'
          type='password'
          label='Password'
          formHook={register('password', {
            required: {
              value: true,
              message: 'Please enter password',
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
          errormsg={errors.password}
        />

        <div className='text-center md:text-left'>
          <Button
            size='large'
            type='submit'
            isLoading={isLoading}
            classes={`mt-4`}
          >
            Login
          </Button>
        </div>

        <div className='mt-5 font-semibold text-sm text-slate-500 text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]'>
          <span className='pr-1 text-[16px]'>Don&apos;t have an account?</span>
          <Links
            onClick={() => {
              window.location.href = '/signup';
            }}
          >
            Register
          </Links>
        </div>
      </form>
    </div>
  );
}
