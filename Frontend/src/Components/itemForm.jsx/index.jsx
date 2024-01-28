/* eslint-disable react/prop-types */
import Input from '../../UI/input';
import InputRow from '../../UI/inputRow';
import Button from '../../UI/button';
import CancelButton from '../../UI/CancelButton';
import FileInput from '../../UI/FileInput';
import RegisterMap from './RegisterMap';
import { useState } from 'react';

function ItemForm({ close }) {
  const [itemCoordinates, setItemCoordinates] = useState({});
  const currentDate = new Date().toISOString().split('T')[0];

  console.log({ itemCoordinates, currentDate });

  return (
    <div className='min-w-[650px] font-primary'>
      <h1 className='font-bold text-2xl  text-text_primary pb-3 border-b border-primary tracking-wide border-gray-300 uppercase'>
        Item Registration
      </h1>
      <div className='pt-5'>
        <InputRow label='Name of item'>
          <Input type='text' placeholder={'eg. Asus TUF'} />
        </InputRow>
        <InputRow label='Category of item'>
          <Input type='text' placeholder={'eg. Computer'} />
        </InputRow>
        <InputRow label='Description of item'>
          <Input
            type='text'
            placeholder={
              'eg. My item color is black , with 32 inches screen size'
            }
          />
        </InputRow>
        <InputRow label={'Lost Date'}>
          <Input type={'date'} max={currentDate} />
        </InputRow>
        <InputRow label='Address of item'>
          <Input type='text' placeholder={'eg. Butwal, Milanchwok'} />
        </InputRow>
        <InputRow label={'Item Images'}>
          <FileInput label={'Select Images'} />
        </InputRow>

        <InputRow label={'Lost Location'}>
          <RegisterMap setItemCoordinates={setItemCoordinates} />
        </InputRow>

        <div className='flex justify-end gap-7'>
          <CancelButton onClick={close}>Cancel</CancelButton>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
