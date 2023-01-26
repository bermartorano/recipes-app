import React, { useState } from 'react';

export default function SearchBar() {
  const [searchInfo, setSearchInfo] = useState({
    searchBarInput: 'teste',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
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
      >
        procurar
      </button>
      <label htmlFor="radio-select-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          name="apiSearch"
          onClick={ handleChange }
        />
        <p>Ingrediente</p>
        <input
          type="radio"
          data-testid="name-search-radio"
          value="name"
          name="apiSearch"
          onClick={ handleChange }
        />
        <p>Nome</p>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          name="apiSearch"
          onClick={ handleChange }
        />
        <p>Primeira Letra</p>
      </label>
    </div>
  );
}
