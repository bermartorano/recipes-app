import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWith } from './helpers/renderWith';

import { fetchMock } from './mock/fetchMock';

import App from '../App';

describe('Sequência de testes relacionadas à página <Header />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica a funcionalidade do botão searchIcon', async () => {
    renderWith(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    act(() => {
      userEvent.type(email, 'trybe@test.com');
      userEvent.type(password, '1234567');
      userEvent.click(button);
    });

    const searchButton = screen.getByRole('presentation');

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
