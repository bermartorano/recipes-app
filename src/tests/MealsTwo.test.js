import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWith } from './helpers/renderWith';
import { clickOnCategory, openSearchBar, searchOnSearchBar } from './helpers/interactionHelpers';

import { fetchMock } from './mock/fetchMock';
import { FILTERED_BY_CATEGORY_FOODS, FILTERED_BY_NAME_FOODS } from './mock/mockFoodAPI';

import Meals from '../pages/Meals';

const className = '.card-recipe';

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
      const allCardsByClass = document.querySelectorAll(className);

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

    const allCardsByClass = document.querySelectorAll(className);
    expect(allCardsByClass).toHaveLength(1);
  });

  test('Verifica se ao remover a seleção da categoria a página volta a exibir todas as receitas', async () => {
    await clickOnCategory();

    await waitFor(() => {
      expect(document.querySelectorAll(className)).toHaveLength(1);
      expect(screen.queryByTestId(/^All-category-filter$/)).not.toBeChecked();
    });

    await clickOnCategory();

    await waitFor(() => {
      expect(document.querySelectorAll(className)).toHaveLength(12);
      expect(screen.queryByTestId(/^All-category-filter$/)).toBeChecked();
    });
  });

  test('Verifica se ao clicar na categoria All todos os elementos voltam a ser exibidos na tela', async () => {
    await clickOnCategory();

    userEvent.click(await screen.findByTestId(/^All-category-filter$/));

    await waitFor(() => {
      expect(document.querySelectorAll(className)).toHaveLength(12);
      expect(screen.queryByTestId(/^All-category-filter$/)).toBeChecked();
    });
  });
});
