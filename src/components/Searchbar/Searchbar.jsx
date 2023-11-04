import {useState} from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';


export default function Searchbar({onSubmit}) {

  const[search, setSearch] = useState('')

const handleValue = event => {
  setSearch(event.target.value)
};

  const handleSabmit = (event) => {
    event.preventDefault();
    if (search.trim() === '') {
       toast.error('Please enter a request!')
      return;
    }
    onSubmit(search.trim());
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSabmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleValue}
          value={search}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


