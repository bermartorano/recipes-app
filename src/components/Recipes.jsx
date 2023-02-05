import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { RecipesContext } from '../context/RecipesProvider';

import RecipeCard from './RecipeCard';

import { fetchRecipe, pageChecker, pageReferences } from '../services/helperCorrectPage';

function Recipes({ pageSubject }) {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [switchSelected, setSwitchButton] = useState('all');

  const [categories, setCategories] = useState([]);

  const { page, id, title, thumb } = pageReferences(pageChecker(pageSubject)[0]);

  const maxRecipesToRender = 12;
  const maxCategoriesToRender = 5;
  const recipesToRender = recipes[page].slice(0, maxRecipesToRender);

  const initialRecipes = async () => {
    const initialRecipesFetched = await fetchRecipe(page)();
    setRecipes({ ...recipes, [page]: [...initialRecipesFetched] });

    const categoriesFetch = await fetchRecipe(page)({ key: 'categories', search: '' });
    setCategories(categoriesFetch);
  };

  useEffect(() => {
    initialRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = async ({ target }) => {
    const { value } = target;

    if (switchSelected === value) {
      setSwitchButton('all');
      initialRecipes();
    } else {
      setSwitchButton(value);
    }

    const recipesByCategory = await fetchRecipe(page)({
      key: 'categoryFilter', search: value });
    setRecipes({ ...recipes, [page]: [...recipesByCategory] });
  };

  function handleClearFilters() {
    setSwitchButton('all');
    initialRecipes();
  }

  return (
    <div>
      <div>
        {categories.slice(0, maxCategoriesToRender).map(({ strCategory }, index) => (
          <label htmlFor={ `switch-${index}` } key={ index }>
            <input
              type="checkbox"
              id={ `switch-${index}` }
              data-testid={ `${strCategory}-category-filter` }
              onChange={ handleCategoryClick }
              value={ strCategory }
              checked={ switchSelected === strCategory }
            />
            {`${strCategory}`}
          </label>
        ))}
        <label htmlFor="all-categories-recipes">
          <input
            type="checkbox"
            data-testid="All-category-filter"
            onClick={ handleClearFilters }
            value="all"
            name="all-categories-recipes"
            onChange={ handleClearFilters }
            checked={ switchSelected === 'all' }
          />
          All
        </label>
      </div>
      {recipesToRender.map((rec, index) => (
        <div
          className="card-recipe"
          key={ index }
        >
          <RecipeCard
            index={ index }
            recipeName={ rec[title] }
            imgSrc={ rec[thumb] }
            url={ `/${page}/${rec[id]}` }
          />
        </div>
      ))}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  pageSubject: PropTypes.string.isRequired,
};
