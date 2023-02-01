import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWith } from './helpers/renderWithRouter';

import { fetchMock } from './mock/fetchMock';

import Profile from '../pages/Profile';

describe('Sequência de testes relacionadas à página <App />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se os elementos do componente <Footer /> são renderizados na página', () => {
    // Renderizar a página que o componente se encontra
    renderWith(<Profile />, ['/profile']);

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

describe('Sequência de testes relacionadas à página <Profile />', () => {
  test('Verifica se são renderizados os 3 botões da página <Profile/>, "Done Recipes", "Favorite Recipes" e "Logout".', () => {
    // Renderizar a página que o componente se encontra
    renderWithRouter(<Profile />);
    // Capturar os elementos da tela
    const captureDoneRecipes = screen.getByTestId(/profile-done-btn/);
    const captureFavoriteRecipes = screen.getByTestId(/profile-favorite-btn/);
    const captureLogout = screen.getByTestId(/profile-logout-btn/);
    // Verificar os valores, a existência, etc desses elementos da tela
    expect(captureDoneRecipes).toBeInTheDocument();
    expect(captureFavoriteRecipes).toBeInTheDocument();
    expect(captureLogout).toBeInTheDocument();
  });
  test('Verifica se o texto e o icone são renderizados na página', () => {
    // Renderizar a página que o componente se encontra
    renderWithRouter(<Profile />);
    // Capturar os elementos da tela
    const captureText = screen.getByText(/profile/i);
    const captureIcon = screen.getByTestId(/profile-top-btn/);
    // Verificar os valores, a existência, etc desses elementos da tela
    expect(captureText).toBeInTheDocument();
    expect(captureIcon).toBeInTheDocument();
  });
  test('Verifica se clicado, o botão nos redireciona a rota correta', () => {
    // Renderizar a página que o componente se encontra
    const { history } = renderWithRouter(<Profile />);
    // Capturar os elementos da tela
    act(() => {
      const captureDoneRecipes = screen.getByTestId(/profile-done-btn/);
      const captureFavoriteRecipes = screen.getByTestId(/profile-favorite-btn/);
      const captureLogout = screen.getByTestId(/profile-logout-btn/);
      // Verificar os valores, a existência, etc desses elementos da tela
      expect(captureDoneRecipes).toBeInTheDocument();
      expect(captureFavoriteRecipes).toBeInTheDocument();
      expect(captureLogout).toBeInTheDocument();
      // Clicar nos botões
      act(() => {
        captureDoneRecipes.click();
        captureFavoriteRecipes.click();
        captureLogout.click();
      });
      // Verificar se a rota mudou
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
      expect(pathname).toBe('/favorite-recipes');
      expect(pathname).toBe('/');
    });
  });
  afterEach(cleanup);
  it('Verifica se exibe o display de usuário', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
    const { getByTestId } = renderWithRouter(<Profile />);
    const emailElement = getByTestId('profile-email');
    expect(emailElement.textContent).toBe('test@example.com');
  });
});
