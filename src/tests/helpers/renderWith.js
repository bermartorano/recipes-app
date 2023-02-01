import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RecipesProvider from '../../context/RecipesProvider';

function withRouter(component, history) {
  return (<Router history={ history }>{ component }</Router>);
}

function withProvider(component) {
  return (<RecipesProvider>{ component }</RecipesProvider>);
}

export function renderWith(component, initialEntries = ['/']) {
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(withRouter(withProvider(component), history)), history,
  };
}
