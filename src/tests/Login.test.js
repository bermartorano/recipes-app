import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWithRouter';
import { Login } from '../services/pagesExports';

describe('Testa o componente <Login />', () => {
  test('Verifica se Login contém os campos de email, senha e botão: ', () => {
    renderWithRouter(<Login />);

    const login = screen.getByText(/login/i);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão. seremos redirecionados para "/meals"', () => {
    const { history } = renderWithRouter(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    act(() => {
      userEvent.type(email, 'trybe@test.com');
      userEvent.type(password, '1234567');
      userEvent.click(button);
    });

    expect(history.location.pathname).toEqual('/meals');
  });
});
