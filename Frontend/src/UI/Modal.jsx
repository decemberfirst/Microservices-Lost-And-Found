/* eslint-disable react/prop-types */
import { createContext, useState, useContext, cloneElement } from 'react';
import { createPortal } from 'react-dom';

const modalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <modalContext.Provider value={{ openName, close, open }}>
      {children}
    </modalContext.Provider>
  );
}

function Open({ children, opens: openWindowName, onClickHandler }) {
  const { open } = useContext(modalContext);
  if (!children) return null;
  return cloneElement(children, {
    onClick: () => {
      open(openWindowName);
      onClickHandler?.();
      console.log('Opened');
    },
  });
}

function Window({ children, name, additionalHandler }) {
  const { openName, close } = useContext(modalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className='fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center '>
      <div
        className='fixed top-0 left-0 w-full h-full  backdrop-blur-sm backdrop-brightness-50'
        onClick={() => {
          close();
          additionalHandler && additionalHandler();
        }}
      ></div>
      <div className='relative z-40 bg-white p-8'>
        <div>{cloneElement(children, { close })}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
