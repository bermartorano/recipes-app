import { waitFor } from '@testing-library/react';

import { fetchMock } from './mock/fetchMock';

import { renderWith } from './helpers/renderWith';

import RecipeDetails from '../pages/RecipeDetails';

const RECIPE_TO_TEST = '/meals/52773';

describe('Sequência de testes relacionadas à página <RecipeDetails />', () => {
  beforeEach(() => { jest.spyOn(global, 'fetch'); global.fetch = jest.fn(fetchMock); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se ao renderizar a tela com uma rota, a rota é renderizada corretamente', () => {
    const { history } = renderWith(<RecipeDetails />, [RECIPE_TO_TEST]);

    expect(history.location.pathname).toBe(RECIPE_TO_TEST);
  });

  test('Verifica se é feita uma requisição ao carregar a página com o id da receita', async () => {
    renderWith(<RecipeDetails />, [RECIPE_TO_TEST]);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52773');
    });
  });
});
