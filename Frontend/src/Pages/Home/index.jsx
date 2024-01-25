import Header from '../../UI/Header';
import Modal from '../../UI/Modal';
import ItemForm from '../../Components/itemForm.jsx';

export default function Home() {
  return (
    <div className='container'>
      <Header />
      <Modal>
        <Modal.Open opens='modal'>
          <button>Post Item</button>
        </Modal.Open>
        <Modal.Window name='modal'>
          <ItemForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
