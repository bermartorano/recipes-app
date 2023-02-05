import { screen } from '@testing-library/react';

import { renderWith } from './helpers/renderWith';

import App from '../App';

describe('Sequência de testes relacionada à rota <NotFound />', () => {
  test('Verifica se ao tentar acessar uma rota que não está prevista a aplicação redireciona para a página <NotFound />, e verifica se todos os componentes estão previstos na tela', async () => {
    const { history } = renderWith(<App />);

    history.push('/not-exist-page');

    expect(history.location.pathname).toBe('/not-exist-page');

    const notFound = await screen.findByText('Page Not Found');

    expect(notFound).toBeInTheDocument();
  });
});
