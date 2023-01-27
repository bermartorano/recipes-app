import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../images/profileIcon.svg';
import { ReactComponent as SearchIcon } from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, hasSearchIcon } = props;
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      { showSearchBar && <SearchBar titleToFetch={ title } />}
      <ProfileIcon onClick={ handleProfileClick } data-testid="profile-top-btn" />
      { hasSearchIcon && (
        <SearchIcon onClick={ handleSearchIconClick } data-testid="search-top-btn" />)}
      <p data-testid="page-title">{title}</p>
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchIcon: PropTypes.bool.isRequired,
};
