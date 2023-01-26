import React from 'react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Sequência de testes relacionadas à página <App />', () => {
  test('Verifica se os elementos do componente <Footer /> são renderizados na página', () => {
    // Renderizar a página que o componente se encontra
    renderWithRouter(<App />);
  });
});
