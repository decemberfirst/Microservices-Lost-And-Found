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

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(modalContext);
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(modalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className='fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center'>
      <div
        className='fixed top-0 left-0 w-full h-full bg-black opacity-50 '
        onClick={close}
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
