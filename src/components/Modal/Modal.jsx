import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';



function Modal({ data, onCloseModal } ) {
const {tags, largeImageURL} = data

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
          src={largeImageURL}
          alt={tags}
        />
      </div>
    </div>
  );
}

export default Modal


Modal.propTypes = {
  dataImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  onCloseModal: PropTypes.func.isRequired,
};

