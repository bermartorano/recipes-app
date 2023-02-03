import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ALL_CATEGORIES_FOODS } from '../mock/mockFoodAPI';

export function searchOnSearchBar(inputType, radioButton) {
  const { type, radio } = { type: screen.getByTestId(/^search-input$/), radio: screen.getByTestId(radioButton) };

  userEvent.clear(type);
  userEvent.type(type, inputType);
  userEvent.click(radio);
  userEvent.click(screen.getByTestId(/^exec-search-btn$/));
}

export function openSearchBar() {
  userEvent.click(screen.getByTestId(/^search-top-btn$/));
}

export async function clickOnCategory() {
  const { strCategory } = ALL_CATEGORIES_FOODS.meals[4];
  const goatButton = await screen.findByTestId(`${strCategory}-category-filter`);
  userEvent.click(goatButton);
}

export function captureLoginScreenElements() {
  return {
    head: screen.getByRole('heading', { level: 1, name: /login/i }),
    email: screen.getByTestId('email-input'),
    password: screen.getByTestId('password-input'),
    button: screen.getByTestId('login-submit-btn'),
  };
}

export function fillLoginInputs(emailText, passwordText) {
  const { email, password } = captureLoginScreenElements();

  userEvent.clear(email);
  userEvent.clear(password);
  userEvent.type(email, emailText);
  userEvent.type(password, passwordText);
}

export async function logIn() {
  fillLoginInputs('email@email.com', 'senhaComMaiDeSeisLetras');
  userEvent.click(screen.getByTestId('login-submit-btn'));
}
