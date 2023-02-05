import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWith } from './helpers/renderWith';
import { clickOnCategory, openSearchBar, searchOnSearchBar } from './helpers/interactionHelpers';

import { fetchMock } from './mock/fetchMock';
import { ALL_CATEGORIES_DRINKS, FILTERED_BY_CATEGORY_DRINKS, FILTERED_BY_NAME_DRINKS } from './mock/mockDrinkAPI';

import Drinks from '../pages/Drinks';

const className = '.card-recipe';

describe('Sequência de testes relacionadas à interação do usuário com a página <Meals />, e consulta à API', () => {
  beforeEach(() => { jest.spyOn(global, 'fetch'); global.fetch = jest.fn(fetchMock); renderWith(<Drinks />, ['/drinks']); openSearchBar(); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se é realizada uma consulta à API com a url correta', async () => {
    const firstEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const secondEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(firstEndPoint);
      expect(fetch).toHaveBeenLastCalledWith(secondEndPoint);
    });
  });

  // funcionalidades do componente <SearchBar />
  test('Verifica se ao interagir com a barra de pesquisar as urls corretas são chamadas', async () => {
    searchOnSearchBar('rum', /^name-search-radio$/);
    searchOnSearchBar('y', /^first-letter-search-radio$/);
    searchOnSearchBar('rum', /^ingredient-search-radio$/);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(5);
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=rum');
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y');
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum');
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
    searchOnSearchBar('rum', /^name-search-radio$/);

    await waitFor(() => {
      const allCardsByClass = document.querySelectorAll(className);

      expect(allCardsByClass).toHaveLength(FILTERED_BY_NAME_DRINKS.drinks.length);

      FILTERED_BY_NAME_DRINKS.drinks.forEach(({ strDrink, strDrinkThumb }, index) => {
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`)).toHaveAttribute('src', strDrinkThumb);
        expect(screen.getByTestId(`${index}-card-name`)).toHaveTextContent(strDrink);
      });
    });
  });

  // Funcionalidades do componente <Recipes /> e <RecipesCard />
  test('Verifica se ao clicar em uma categoria a função fetch é chamada com o a url correta', async () => {
    const urlGoat = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa';

    await clickOnCategory(ALL_CATEGORIES_DRINKS.drinks);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenCalledWith(urlGoat);
    });
  });

  test('Verifica se ao clicar em uma categoria os itens daquela categoria são renderizados na tela', async () => {
    const { strDrink, strDrinkThumb } = FILTERED_BY_CATEGORY_DRINKS.drinks[0];

    await clickOnCategory(ALL_CATEGORIES_DRINKS.drinks);
    await waitForElementToBeRemoved(screen.queryByTestId('10-card-img'));

    const cardElement = screen.getByTestId('0-recipe-card');
    const imgTwoElement = screen.getByTestId('0-card-img');
    const nameElement = screen.getByTestId('0-card-name');

    expect(cardElement).toBeInTheDocument();
    expect(imgTwoElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(imgTwoElement).toHaveAttribute('src', strDrinkThumb);
    expect(nameElement).toHaveTextContent(strDrink);

    const allCardsByClass = document.querySelectorAll(className);
    expect(allCardsByClass).toHaveLength(9);
  });

  test('Verifica se ao remover a seleção da categoria a página volta a exibir todas as receitas', async () => {
    await clickOnCategory(ALL_CATEGORIES_DRINKS.drinks);

    await waitFor(() => {
      expect(document.querySelectorAll(className)).toHaveLength(9);
      expect(screen.queryByTestId(/^All-category-filter$/)).not.toBeChecked();
    });

    await clickOnCategory(ALL_CATEGORIES_DRINKS.drinks);

    await waitFor(() => {
      expect(document.querySelectorAll(className)).toHaveLength(12);
      expect(screen.queryByTestId(/^All-category-filter$/)).toBeChecked();
    });
  });

  test('Verifica se ao clicar na categoria All todos os elementos voltam a ser exibidos na tela', async () => {
    await clickOnCategory(ALL_CATEGORIES_DRINKS.drinks);
    userEvent.click(await screen.findByTestId(/^All-category-filter$/));
    await waitFor(() => {
      expect(document.querySelectorAll(className)).toHaveLength(12);
      expect(screen.queryByTestId(/^All-category-filter$/)).toBeChecked();
    });
  });
});
