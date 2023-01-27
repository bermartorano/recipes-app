import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Sequência de testes relacionadas à página <App />', () => {
  test('Verifica se os elementos do componente <Footer /> são renderizados na página', () => {
    // Renderizar a página que o componente se encontra
    renderWithRouter(<Profile />, ['/profile']);

    // Capturar os elementos da tela
    const captureFooter = screen.getByTestId(/footer/);
    const captureDrinkImg = screen.getByTestId(/drinks-bottom-btn/);
    const captureMealImg = screen.getByTestId(/meals-bottom-btn/);

    // Verificar os valores, a existência, etc desses elementos da tela
    expect(captureFooter).toBeInTheDocument();
    expect(captureDrinkImg).toBeInTheDocument();
    expect(captureMealImg).toBeInTheDocument();
  });
});