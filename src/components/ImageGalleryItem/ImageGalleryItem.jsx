import PropTypes from 'prop-types';
import {useState} from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';


export default function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
  <div >
    <li
      className={css.ImageGalleryItem}
      onClick={
        toggleModal()
      }
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {modal === true && (
        <Modal data={{ tags, largeImageURL }} onCloseModal={toggleModal} />
      )}
    </li>
    </div>
  )
      }

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};







// class ImageGalleryItem extends React.Component {
//   state = {
//     isOpenModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ isOpenModal }) => ({
//       isOpenModal: !isOpenModal,
//     }));
//   };

//   render() {
//     const { webformatURL, tags, largeImageURL } = this.props;
//     return (
      // <div>
      //   <li
      //     className={css.ImageGalleryItem}
      //     onClick={() => {
      //       this.toggleModal();
      //     }}
      //   >
      //     <img
      //       className={css.ImageGalleryItemImage}
      //       src={webformatURL}
      //       alt={tags}
      //     />
      //     {this.state.isOpenModal === true && (
      //       <Modal
      //         data={{ tags, largeImageURL }}
      //         onCloseModal={this.toggleModal}
      //       />
      //     )}
      //   </li>
      // </div>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   tags: PropTypes.string.isRequired,
//   webformatURL: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };

// export default ImageGalleryItem;
