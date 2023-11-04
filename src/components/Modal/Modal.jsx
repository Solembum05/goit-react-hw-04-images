import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';



function Modal(hits, onCloseModal) {
useEffect(() => {
  const closeEscape = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', closeEscape);
    document.body.classList.toggle('overflow');


    return () => {
      window.removeEventListener('keydown', closeEscape);
      document.body.classList.toggle('overflow');
    };
}, [onCloseModal]);






    function closeOverlay(event) {
  if (event.currentTarget !== event.target) {
    onCloseModal();
  }
}
  


  return (
    <div className={css.Overlay} onClick={closeOverlay}>
      <div className={css.Modal}>
        <img
          className={css.largeImg}
          src={hits.largeImageURL}
          alt={hits.tags}
        />
      </div>
    </div>
  );
}

export default Modal












// class Modal extends React.Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeEscape);
//     document.body.classList.toggle('overflow');
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeEscape);
//     document.body.classList.toggle('overflow');
//   }

//   closeEscape = event => {
//     if (event.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };

//   closeOverlay = event => {
//     if (event.currentTarget !== event.target) {
//       this.props.onCloseModal();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props.data;
//     return (
//       <div className={css.Overlay} onClick={this.closeOverlay}>
//         <div className={css.Modal}>
//           <img className={css.largeImg} src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     );
//   }
// }
Modal.propTypes = {
  dataImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  onCloseModal: PropTypes.func.isRequired,
};

