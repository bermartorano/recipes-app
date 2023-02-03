import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import { renderWith } from './helpers/renderWith';
import { clickOnCategory, logIn, openSearchBar, searchOnSearchBar } from './helpers/mealsHelpers';

import { fetchMock } from './mock/fetchMock';
import { FILTERED_BY_CATEGORY_FOODS, FILTERED_BY_NAME_FOODS } from './mock/mockFoodAPI';

import Meals from '../pages/Meals';
import App from '../App';

describe('Sequência de testes relacionadas à interação do usuário com a página <Meals />, e consulta à API', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch'); global.fetch = jest.fn(fetchMock);

    renderWith(<Meals />, ['/meals']); openSearchBar();
  });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se é realizada uma consulta à API com a url correta', async () => {
    const firstEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const secondEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(firstEndPoint);
      expect(fetch).toHaveBeenLastCalledWith(secondEndPoint);
    });
  });

  // funcionalidades do componente <SearchBar />
  test('Verifica se ao interagir com a barra de pesquisar as urls corretas são chamadas', async () => {
    searchOnSearchBar('taco', /^name-search-radio$/);
    searchOnSearchBar('y', /^first-letter-search-radio$/);
    searchOnSearchBar('salmon', /^ingredient-search-radio$/);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(5);
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=taco');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=y');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=salmon');
    });
  });

  test('Verifica é emitido um alerta quando o campo não é preenchidos corretamente', async () => {
    jest.spyOn(window, 'alert');
    searchOnSearchBar('mais de uma letra', /^first-letter-search-radio$/);
    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledTimes(1);

    global.fetch = jest.fn()
      .mockResolvedValue({ json: () => jest.fn().mockResolvedValue({ meals: [] }) });

    searchOnSearchBar('invalid', /^ingredient-search-radio$/);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
      expect(alert).toHaveBeenCalledTimes(2);
    });
  });

  test('Verifica se são renderizados os elementos na para uma das opções de busca', async () => {
    searchOnSearchBar('taco', /^name-search-radio$/);

    await waitFor(() => {
      const allCardsByClass = document.querySelectorAll('.card-recipe');

      expect(allCardsByClass).toHaveLength(FILTERED_BY_NAME_FOODS.meals.length);

      FILTERED_BY_NAME_FOODS.meals.forEach(({ strMeal, strMealThumb }, index) => {
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`)).toHaveAttribute('src', strMealThumb);
        expect(screen.getByTestId(`${index}-card-name`)).toHaveTextContent(strMeal);
      });
    });
  });

  // Funcionalidades do componente <Recipes /> e <RecipesCard />
  test('Verifica se ao clicar em uma categoria a função fetch é chamada com o a url correta', async () => {
    const urlGoat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat';

    await clickOnCategory();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenCalledWith(urlGoat);
    });
  });

  test('Verifica se ao clicar em uma categoria os itens daquela categoria são renderizados na tela', async () => {
    const { strMeal, strMealThumb } = FILTERED_BY_CATEGORY_FOODS.meals[0];

    await clickOnCategory();
    await waitForElementToBeRemoved(screen.queryByTestId('10-card-img'));

    const cardElement = screen.getByTestId('0-recipe-card');
    const imgTwoElement = screen.getByTestId('0-card-img');
    const nameElement = screen.getByTestId('0-card-name');

    expect(cardElement).toBeInTheDocument();
    expect(imgTwoElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(imgTwoElement).toHaveAttribute('src', strMealThumb);
    expect(nameElement).toHaveTextContent(strMeal);

    const allCardsByClass = document.querySelectorAll('.card-recipe');
    expect(allCardsByClass).toHaveLength(1);
  });
});

describe('Verifica funcionalidades de roteamento dos componentes da página <Meals />', () => {
  beforeEach(() => { jest.spyOn(global, 'fetch'); global.fetch = jest.fn(fetchMock); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se quando retornar, da consulta à API, apenas um resultado o usuário é redirecionado', async () => {
    const { history } = renderWith(<App />);
    logIn();
    openSearchBar();
    searchOnSearchBar('y', /^first-letter-search-radio$/);

    expect(await screen.findByTestId(/^recipe-title$/)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals/52871');
  });
});
