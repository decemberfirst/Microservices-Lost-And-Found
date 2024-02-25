/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { SlOptions } from 'react-icons/sl';

const MenuContext = createContext();

function Menu({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = (id) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  console.log({ openId, id });

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: Math.trunc(window.innerWidth - rect.width - rect.x),
      y: Math.trunc(rect.y + rect.height + 5),
    });

    openId && openId === id ? close() : open(id);
  }

  return (
    <button onClick={handleClick}>
      <SlOptions />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);

  if (openId !== id) return null;

  return createPortal(
    <div
      className={`fixed bg-white shadow-md z-[5000]  list-none`}
      style={{ zIndex: 999, top: `${position.y}px`, right: `${position.x}px` }}
      onClick={() => {
        console.log('List Clicked');
        close();
      }}
    >
      {children}
    </div>,
    document.body
  );
}

function Button({ children, onClick }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li
      className='px-3 py-2 hover:bg-gray-400 flex gap-2 items-center cursor-pointer'
      onClick={handleClick}
    >
      {children}
    </li>
  );
}

Menu.Menu = Menu;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;
export default Menu;
