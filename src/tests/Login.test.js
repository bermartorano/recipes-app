import userEvent from '@testing-library/user-event';

import { renderWith } from './helpers/renderWith';
import { captureLoginScreenElements, fillLoginInputs } from './helpers/interactionHelpers';

import { fetchMock } from './mock/fetchMock';

import { Login } from '../services/pagesExports';

describe('Testa o componente <Login />', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se existem todos os componentes html esperados na tela de login', () => {
    renderWith(<Login />);

    const screenElements = captureLoginScreenElements();

    expect(screenElements.head).toBeInTheDocument();
    expect(screenElements.email).toBeInTheDocument();
    expect(screenElements.password).toBeInTheDocument();
    expect(screenElements.button).toBeInTheDocument();
  });

  test('Verifica é possível escrever nos campos de inputs da tela login', () => {
    renderWith(<Login />);

    const { email, password } = captureLoginScreenElements();

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');

    fillLoginInputs('trybe@test.com', '1234567');

    expect(email).toHaveValue('trybe@test.com');
    expect(password).toHaveValue('1234567');
  });

  test('Verifica se o botão de login é habilitado apenas quando os campos são preenchidos corretamente, e se o localStorage está limpo', () => {
    renderWith(<Login />);

    const { button } = captureLoginScreenElements();

    expect(button).toBeDisabled();

    fillLoginInputs('qualquerNome', '1234567');

    expect(button).toBeDisabled();
    expect(localStorage.getItem('user')).toBeNull();

    fillLoginInputs('valide.email@valid.com', 'senhaComMaisDeSeisCaracteres');

    expect(button).toBeEnabled();
    expect(localStorage.getItem('user')).toBeNull();

    fillLoginInputs('emailValido@email.com', '123');

    expect(button).toBeDisabled();
    expect(localStorage.getItem('user')).toBeNull();
  });

  test('Verifica se ao clicar no botão. seremos redirecionados para "/meals" e salva as informações no localStorage', () => {
    const { history } = renderWith(<Login />);

    fillLoginInputs('valide.emaila@valid.com', 'senhaComMaisDeSeisCaracteres');

    const { button } = captureLoginScreenElements();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: 'valide.emaila@valid.com' });
  });
});
