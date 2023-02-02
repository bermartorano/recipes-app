import { screen } from '@testing-library/react';

import { renderWith } from './helpers/renderWith';

import fetchMock from './mock/fetchMock';

import App from '../App';

describe('Sequência de testes relacionadas à página <App />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a rota inicial é para o componente login ao inicializar a página', () => {
    // Renderizar a página que o componente se encontra
    const { history } = renderWith(<App />);

    const login = screen.getByText(/login/i);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
});
