/* eslint-disable react/prop-types */
import { useState } from 'react';
import Input from '../../UI/input';
import InputRow from '../../UI/inputRow';
import Button from '../../UI/button';
import CancelButton from '../../UI/CancelButton';
import FileInput from '../../UI/FileInput';
import RegisterMap from './RegisterMap';
import { useForm } from 'react-hook-form';
import usePostItem from '../../Services/usePostItem';
import useEditItem from '../../Services/useEditItem';

function ItemForm({ close, editValues, editId, afterEdit }) {
  const [itemCoordinates, setItemCoordinates] = useState();
  const [file, setFile] = useState();
  const { editItem } = useEditItem();

  const isEditSession = editId !== undefined && editValues !== undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          itemName: editValues.itemName,
          itemCategory: editValues.itemCategory,
          itemDescription: editValues.itemDescription,
          postType: editValues.postType,
          _id: editValues._id,
        }
      : {},
  });
  const { postItem } = usePostItem();

  const currentDate = new Date().toISOString().split('T')[0];

  function onsubmit(data) {
    if (isEditSession) {
      console.log(data);
      editItem({ ...data });
      close();
      afterEdit();
      return;
    }

    const formData = new FormData();
    formData.append('itemName', data.itemName);
    formData.append('itemCategory', data.itemCategory);
    formData.append('itemDescription', data.itemDescription);
    formData.append('postType', data.postType);
    formData.append('lostDate', data.lostDate);
    formData.append(
      'lostLocation',
      JSON.stringify({
        type: 'Point',
        coordinates: [itemCoordinates.lng, itemCoordinates.lat],
      })
    );

    for (let x of file) {
      formData.append('images', x);
    }

    postItem(formData);
    close();
  }

  return (
    <div className='min-w-[650px] font-primary'>
      <h1 className='font-bold text-2xl  text-text_primary pb-3 border-b border-primary tracking-wide border-gray-300 uppercase'>
        Item {isEditSession ? 'Edit' : 'Registration'}
      </h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='pt-5'>
          <InputRow label='Name of item'>
            <Input
              type='text'
              formHook={register('itemName', {
                required: 'Please enter item name',
              })}
              errormsg={errors.itemName}
            />
          </InputRow>
          <InputRow label='Category of item'>
            <Input
              type='text'
              formHook={register('itemCategory', {
                required: 'Please enter item category',
              })}
              errormsg={errors.itemCategory}
            />
          </InputRow>

          <InputRow label='Description of item'>
            <Input
              type='text'
              formHook={register('itemDescription', {
                required: 'Please enter item description',
              })}
              errormsg={errors.itemDescription}
            />
          </InputRow>

          <div className='flex gap-20'>
            <div className='flex gap-3 py-3 font-primary'>
              <input
                type='radio'
                name='postType'
                id='LOST'
                value='LOST'
                {...register('postType', { required: true })}
                defaultChecked={
                  !isEditSession || editValues.postType === 'LOST'
                }
              />
              <label htmlFor='LOST' className='cursor-pointer'>
                LOST
              </label>
            </div>
            <div className='flex gap-3 py-3 font-primary'>
              <input
                type='radio'
                name='postType'
                id='FOUND'
                value='FOUND'
                {...register('postType', { required: true })}
                defaultChecked={
                  isEditSession && editValues.postType === 'FOUND'
                }
              />
              <label htmlFor='FOUND' className='cursor-pointer'>
                FOUND
              </label>
            </div>
          </div>

          {!isEditSession && (
            <InputRow label={'Lost / Found Date'}>
              <Input
                type={'date'}
                max={currentDate}
                formHook={register('lostDate', {
                  required: 'Please enter Lost / Found Date',
                })}
                errormsg={errors.lostDate}
              />
            </InputRow>
          )}

          {!isEditSession && (
            <InputRow label={'Item Images'}>
              <FileInput
                label={'Select Images'}
                setFile={setFile}
                file={file}
              />
            </InputRow>
          )}

          {!isEditSession && (
            <InputRow label={'Item Location'}>
              <RegisterMap
                setItemCoordinates={setItemCoordinates}
                itemCoordinates={itemCoordinates}
              />
            </InputRow>
          )}

          <div className='flex justify-end gap-7'>
            <CancelButton onClick={close}>Cancel</CancelButton>
            <Button type='submit' classes='mt-4'>
              {isEditSession ? 'Update' : 'Register'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
