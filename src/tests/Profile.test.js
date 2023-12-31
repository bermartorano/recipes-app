import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWith } from './helpers/renderWith';

import { fetchMock } from './mock/fetchMock';

import Profile from '../pages/Profile';

function changePage(element) {
  act(() => {
    userEvent.click(element);
  });
}

describe('Sequência de testes relacionadas à página <App />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    cleanup();
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
    expect(captureMealImg).toBeInTheDocument();
    expect(captureDrinkImg).toBeInTheDocument();
  });
});

describe('Sequência de testes relacionadas à página <Profile />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se são renderizados os 3 botões da página <Profile/>, "Done Recipes", "Favorite Recipes" e "Logout".', () => {
    // Renderizar a página que o componente se encontra
    renderWith(<Profile />);

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
    renderWith(<Profile />);

    // Capturar os elementos da tela
    const captureText = screen.getByText(/profile/i);
    const captureIcon = screen.getByTestId(/profile-top-btn/);

    // Verificar os valores, a existência, etc desses elementos da tela
    expect(captureText).toBeInTheDocument();
    expect(captureIcon).toBeInTheDocument();
  });

  test('Verifica se clicado, o botão nos redireciona a rota correta', () => {
    // Renderizar a página que o componente se encontra
    const { history } = renderWith(<Profile />, ['/profile']);

    // Capturar os elementos da tela
    const elements = [
      screen.getByTestId(/profile-done-btn/),
      screen.getByTestId(/profile-favorite-btn/),
      screen.getByTestId(/profile-logout-btn/),
    ];

    elements.forEach((eachElement, index) => {
      const pages = ['/done-recipes', '/favorite-recipes', '/'];

      // Verificar os valores, a existência, etc desses elementos da tela
      expect(elements[index]).toBeInTheDocument();

      // Chama função que clica no botão para mudança de página
      changePage(eachElement);
      expect(history.location.pathname).toBe(pages[index]);
      history.push('/profile');
    });
  });

  test('Verifica se exibe o display de usuário', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
    const { getByTestId } = renderWith(<Profile />);
    const emailElement = getByTestId('profile-email');
    expect(emailElement.textContent).toBe('test@example.com');
  });
});
