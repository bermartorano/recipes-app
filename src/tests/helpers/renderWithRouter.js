import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export function renderWithRouter(component, initialEntries = ['/']) {
  const history = createMemoryHistory({ initialEntries });

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
}
