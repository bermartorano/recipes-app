import React from 'react';
import { Header, DoneRecipeCard } from '../services/componentsExport';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      <Header title="Done Recipes" hasSearchIcon={ false } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { doneRecipes && doneRecipes.map((rcp, index) => (
        <DoneRecipeCard key={ rcp.id } recipe={ rcp } index={ index } />))}
    </>
  );
}

export default DoneRecipes;
