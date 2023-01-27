import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { infoFoodRequest } from '../services/foodAPI';
import { infoDrinkRequest } from '../services/drinkAPI';
import { RecepiesContext } from '../context/RecepiesProvider';

export default function SearchBar(props) {
  const { titleToFetch } = props;
  const { setRecepies } = useContext(RecepiesContext);
  const [searchInfo, setSearchInfo] = useState({
    searchBarInput: '',
    searchFilter: '',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { searchBarInput, searchFilter } = searchInfo;
    switch (titleToFetch) {
    case 'Meals': {
      const mealsFetched = await infoFoodRequest({
        key: searchFilter,
        search: searchBarInput,
      });
      setRecepies(mealsFetched);
    }
      break;

    case 'Drinks': {
      const drinksFetched = await infoDrinkRequest({
        key: searchFilter,
        search: searchBarInput,
      });
      setRecepies(drinksFetched);
    }
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <input
        type="text"
        name="searchBarInput"
        data-testid="search-input"
        value={ searchInfo.searchBarInput }
        onChange={ handleChange }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        procurar
      </button>
      <label htmlFor="radio-select-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          name="searchFilter"
          onClick={ handleChange }
        />
        <p>Ingrediente</p>
        <input
          type="radio"
          data-testid="name-search-radio"
          value="name"
          name="searchFilter"
          onClick={ handleChange }
        />
        <p>Nome</p>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          name="searchFilter"
          onClick={ handleChange }
        />
        <p>Primeira Letra</p>
      </label>
    </div>
  );
}

SearchBar.propTypes = {
  titleToFetch: PropTypes.string.isRequired,
};
