import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, hasSearchIcon } = props;
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      { showSearchBar && <SearchBar titleToFetch={ title } />}
      <Link to="/profile">
        <img src={ profileIcon } alt="drink-page" data-testid="profile-top-btn" />
      </Link>
      { hasSearchIcon && (
        <img
          src={ searchIcon }
          alt="search-icon"
          data-testid="search-top-btn"
          role="presentation"
          onClick={ handleSearchIconClick }
          onKeyDown={ handleSearchIconClick }
        />
      )}
      <p data-testid="page-title">{title}</p>
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchIcon: PropTypes.bool.isRequired,
};
