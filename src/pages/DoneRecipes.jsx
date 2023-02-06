import React, { useEffect, useState } from 'react';
import { Header, DoneRecipeCard } from '../services/componentsExport';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  let initialDoneRecipes = [];
  if (doneRecipes) initialDoneRecipes = doneRecipes;
  const [initialRecipes] = useState(initialDoneRecipes);
  const [recipesToRender, setRecipesToRender] = useState(initialDoneRecipes);
  const [filterButton, setFilterButton] = useState('clear');

  const handleFilterClick = ({ target: { name } }) => {
    setFilterButton(name);
  };

  const filtering = (filter) => {
    const recipesFiltered = {
      clear: initialRecipes,
      meal: initialRecipes.filter((recipe) => recipe.type === 'meal'),
      drink: initialRecipes.filter((recipe) => recipe.type === 'drink'),
    };
    return recipesFiltered[filter];
  };

  useEffect(() => {
    setRecipesToRender(filtering(filterButton));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterButton]);

  return (
    <>
      <Header title="Done Recipes" hasSearchIcon={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="clear"
        onClick={ handleFilterClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ handleFilterClick }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ handleFilterClick }
      >
        Drinks
      </button>
      { doneRecipes && recipesToRender.map((rcp, index) => (
        <DoneRecipeCard
          key={ rcp.id }
          recipe={ rcp }
          index={ index }
        />))}
    </>
  );
}

export default DoneRecipes;
