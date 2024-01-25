/* eslint-disable react/prop-types */
import Modal from '../../UI/Modal';
import Map from '../../Components/Map/index';
import CancelButton from '../../UI/CancelButton';
import Button from '../../UI/button';
import { useSearchParams } from 'react-router-dom';

function LocationOptions({ close, setItemCoordinates }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLocationSet = () => {
    setItemCoordinates({
      lat: searchParams.get('lat'),
      lng: searchParams.get('lng'),
    });
    setSearchParams({});
    close();
  };

  const handleLocationCancel = () => {
    setSearchParams({});
    close();
  };

  return (
    <div className='min-w-[1000px]'>
      <h1 className='font-bold text-2xl  text-text_primary pb-3 mb-8 border-b border-primary tracking-wide border-gray-300 uppercase'>
        Item Location
      </h1>
      <Map />
      <div className='flex justify-end gap-7'>
        <CancelButton onClick={handleLocationCancel}>Cancel</CancelButton>
        <Button onClick={handleLocationSet}>Set Location</Button>
      </div>
    </div>
  );
}

function RegisterMap({ setItemCoordinates }) {
  return (
    <Modal>
      <Modal.Open opens='map'>
        <div className='w-full'>
          <button className='block  bg-primary px-4 py-2 text-white mt-5'>
            Choose From Map
          </button>
        </div>
      </Modal.Open>
      <Modal.Window name='map'>
        <LocationOptions setItemCoordinates={setItemCoordinates} />
      </Modal.Window>
    </Modal>
  );
}

export default RegisterMap;
