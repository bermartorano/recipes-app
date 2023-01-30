import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const RecepiesContext = createContext();

function RecepiesProvider({ children }) {
  const [recepies, setRecepies] = useState({
    meals: [],
    drinks: [],
  });

  const values = useMemo(() => ({
    recepies, setRecepies,
  }), [recepies, setRecepies]);

  return (
    <RecepiesContext.Provider value={ values }>
      { children }
    </RecepiesContext.Provider>
  );
}

export default RecepiesProvider;

RecepiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
