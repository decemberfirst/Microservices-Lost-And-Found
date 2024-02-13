import { Toaster } from 'react-hot-toast';

export default function ToasterContainer() {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        success: {
          style: {
            border: '1px solid #10B981',
            width: 'fit-content',
          },
        },
        error: {
          style: {
            border: '1px solid #EF4444',
          },
        },
      }}
    />
  );
}
