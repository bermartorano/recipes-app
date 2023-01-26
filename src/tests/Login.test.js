import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import Meals from '../pages/Meals';

describe('Testa o componente <Login />', () => {
  test('Verifica se Login contém os campos de email, senha e botão: ', () => {
    render(<Login />);
    const login = screen.getByText(/login/i);
    expect(login).toBeInTheDocument();

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
  });
  test('Verifica se ao clickar no botão. seremos redirecionados para "/meals"', () => {
    const { history } = render(<Login />);

    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'trybe@test.com');

    const password = screen.getByTestId('password-input');
    userEvent.type(password, '1234567');

    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    expect(history.location.pathname).toEqual('/meals');
  });
  // test('', () => {

  // });
  // test('', () => {

  // });
  // test('', () => {

  // });
  // test('', () => {

  // });
  // test('', () => {

  // });
});
describe('Verifica a página Meals', () => {
  test('Verifica se Meals contém o texto Meals', () => {
    render(<Meals />);
    const login = screen.getByText(/meals/i);
    expect(login).toBeInTheDocument();
  });
});
