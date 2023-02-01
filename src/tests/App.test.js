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

  test('Verifica se os elementos do componente <Footer /> são renderizados na página', () => {
    // Renderizar a página que o componente se encontra
    renderWith(<App />);
  });
});
