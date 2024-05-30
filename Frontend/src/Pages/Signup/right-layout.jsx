import { useEffect, useState, useCallback } from 'react';
import Input from '../../UI/input';
import { toast } from 'react-hot-toast';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import Button from '../../UI/button';
import { useForm } from 'react-hook-form';
import Links from '../../UI/links';
import { useNavigate } from 'react-router-dom';
import useSignup from '../../Services/useSignup';

function RightLayout() {
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  const { isLoading, signup } = useSignup();

  const getUserLocation = useCallback(async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
          });
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        toast.success('Location Captured...');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      if (!userLocation) {
        toast.error('Please enable location to continue');
        return;
      }

      const updatedData = {
        ...data,
        userLocation: {
          type: 'Point',
          coordinates: [userLocation.longitude, userLocation.latitude],
        },
      };

      signup(updatedData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='md:w-1/3 max-w-sm'>
      <h2 className='text-xl lg:text-3xl text-center pb-4 md:pb-6 font-bold'>
        Create New Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Enter your username'
          type='text'
          label='username'
          formHook={register('username', {
            required: 'Username is required',
          })}
          errormsg={errors.username}
        />
        <Input
          placeholder='Enter your email'
          type='text'
          label='Email'
          formHook={register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Please enter a valid email',
            },
          })}
          errormsg={errors.email}
        />
        <Input
          placeholder='Enter your password'
          type='password'
          label='Password'
          formHook={register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
          errormsg={errors.password}
        />
        <Input
          placeholder='Confirm your password'
          type='password'
          label='Confirm Password'
          formHook={register('confirmPassword', {
            required: 'Please confirm your password',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            validate: (value) =>
              value === password || 'The passwords do not match',
          })}
          errormsg={errors.confirmPassword}
        />

        <div className='text-center md:text-left'>
          <Button size='large' type='submit' isLoading={isLoading}>
            Signup
          </Button>
        </div>

        <div
          className='flex items-center mt-4 border border-secondary px-4 py-2 cursor-pointer'
          onClick={getUserLocation}
        >
          <FaLocationCrosshairs
            className='text-primary text-3xl'
            size={'48px'}
          />
          <div className='text-xs text-gray-500 ml-2'>
            <p className='mb-1'>
              Enhance your experience! Enable location to receive personalized
              content and services based on your area.
            </p>
          </div>
        </div>
        <div className='mt-5 font-semibold text-sm text-slate-500 text-center md:text-left text-[14px] md:text-[16px] lg:text-[18px]'>
          <span className='pr-1 text-[16px]'>Already have an account?</span>
          <Links onClick={() => navigate('/login')}>Sign in</Links>
        </div>
      </form>
    </div>
  );
}

export default RightLayout;
