import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { ALL_CATEGORIES_FOODS } from '../mock/mockFoodAPI';

export function searchOnSearchBar(inputType, radioButton) {
  const { type, radio } = { type: screen.getByTestId(/^search-input$/), radio: screen.getByTestId(radioButton) };
  act(() => {
    userEvent.clear(type);
    userEvent.type(type, inputType);
    userEvent.click(radio);
    userEvent.click(screen.getByTestId(/^exec-search-btn$/));
  });
}

export function openSearchBar() {
  act(() => {
    userEvent.click(screen.getByTestId(/^search-top-btn$/));
  });
}

export async function clickOnCategory() {
  const { strCategory } = ALL_CATEGORIES_FOODS.meals[4];
  const goatButton = await screen.findByTestId(`${strCategory}-category-filter`);
  act(() => { userEvent.click(goatButton); });
}

export function captureScreenElements() {
  return {
    head: screen.getByRole('heading', { level: 1, name: /login/i }),
    email: screen.getByTestId('email-input'),
    password: screen.getByTestId('password-input'),
    button: screen.getByTestId('login-submit-btn'),
  };
}

export function fillInputs(emailText, passwordText) {
  const { email, password } = captureScreenElements();
  act(() => {
    userEvent.clear(email);
    userEvent.clear(password);
    userEvent.type(email, emailText);
    userEvent.type(password, passwordText);
  });
}

export async function logIn() {
  fillInputs('email@email.com', 'senhaComMaiDeSeisLetras');
  act(() => { userEvent.click(screen.getByTestId('login-submit-btn')); });
}
