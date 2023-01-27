import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const values = useMemo(() => ({
    recipes, setRecipes,
  }), [recipes, setRecipes]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
