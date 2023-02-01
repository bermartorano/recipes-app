import React from 'react';
import { renderWith } from './helpers/renderWith';
import App from '../App';

describe('Sequência de testes relacionadas à página <App />', () => {
  test('Verifica se os elementos do componente <Footer /> são renderizados na página', () => {
    // Renderizar a página que o componente se encontra
    renderWith(<App />);
  });
});
