import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWith } from './helpers/renderWith';
import App from '../App';

describe('Sequência de testes relacionadas à página <SearchBar />', () => {
  test('Ferifica a funcionalidade dos botões inputRadio', async () => {
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

    const searchRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(searchRadioFirstLetter).toBeInTheDocument();
  });
});
