import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWith } from './helpers/renderWith';

import { fetchMock } from './mock/fetchMock';
import { ALL_CATEGORIES_FOODS, FOODS, FILTERED_BY_CATEGORY_FOODS } from './mock/mockFoodAPI';

import Meals from '../pages/Meals';

async function clickOnCategory() {
  const { strCategory } = ALL_CATEGORIES_FOODS.meals[4];

  const goatButton = await screen.findByTestId(`${strCategory}-category-filter`);

  act(() => {
    userEvent.click(goatButton);
  });
}

describe('Sequência de testes relacionadas à renderização de elementos da página <Meals />', () => {
  beforeEach(() => { global.fetch = jest.fn(fetchMock); renderWith(<Meals />, ['/meals']); });

  test('Verifica se os elementos html do componente <Header /> são renderizados na página', () => {
    const headerElements = [
      screen.getByTestId(/^profile-top-btn$/),
      screen.getByTestId(/^search-top-btn$/),
      screen.getByTestId(/^page-title$/),
    ];

    headerElements.forEach((eachElement) => {
      expect(eachElement).toBeInTheDocument();
    });
  });

  test('Verifica se os elementos do componente <Footer /> são renderizados na página', () => {
    // Capturar os elementos da tela
    const footerElements = [
      screen.getByTestId(/footer/),
      screen.getByTestId(/drinks-bottom-btn/),
      screen.getByTestId(/meals-bottom-btn/),
    ];

    // Verificar os valores, a existência, etc desses elementos da tela
    footerElements.forEach((eachElement) => {
      expect(eachElement).toBeInTheDocument();
    });
  });

  test('Verifica se os elementos do componente <Recipes /> são renderizados na tela', async () => {
    await waitFor(() => {
      const allCategories = screen.getByTestId(/^All-category-filter$/);
      expect(allCategories).toBeInTheDocument();
      expect(allCategories).toHaveTextContent('All');

      const allCardsByClass = document.querySelectorAll('.card-recipe');
      expect(allCardsByClass).toHaveLength(12);

      for (let index = 0; index <= 11; index += 1) {
        const categoryName = ALL_CATEGORIES_FOODS.meals[index].strCategory;
        const getFoodName = FOODS.meals[index].strMeal;
        const getFoodImage = FOODS.meals[index].strMeal.Thumb;

        const eachCardElement = screen.getByTestId(`${index}-recipe-card`);
        const imgElement = screen.getByTestId(`${index}-card-img`);
        const nameElement = screen.getByTestId(`${index}-card-name`);

        if (index <= 4) {
          const eachCategory = screen
            .getByTestId(`${categoryName}-category-filter`);
          expect(eachCategory).toBeInTheDocument();
          expect(eachCategory).toHaveTextContent(categoryName);
        }

        expect(eachCardElement).toBeInTheDocument();
        expect(imgElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', getFoodImage);
        expect(nameElement).toHaveTextContent(getFoodName);
      }
    });
  });

  test('Verifica se ao clicar no ícone de pesquisa são renderizados os elementos do componente <SearchBar />', () => {
    act(() => {
      userEvent.click(screen.getByTestId(/^search-top-btn$/));
    });

    const searchBarElements = [
      screen.getByTestId(/^search-input$/),
      screen.getByTestId(/^exec-search-btn$/),
      screen.getByTestId(/^ingredient-search-radio$/),
      screen.getByTestId(/^first-letter-search-radio$/),
      screen.getByTestId(/^name-search-radio$/),
    ];

    searchBarElements.forEach((eachElement) => {
      expect(eachElement).toBeInTheDocument();
    });

    expect(searchBarElements[0]).toHaveValue('');
    expect(searchBarElements[1]).toHaveTextContent('procurar');
    expect(searchBarElements[2]).not.toBeChecked();
    expect(searchBarElements[3]).not.toBeChecked();
    expect(searchBarElements[4]).not.toBeChecked();
  });
});

describe('Sequência de testes relacionadas à interação do usuário com a página <Meals />, e consulta à API', () => {
  beforeEach(() => { jest.spyOn(global, 'fetch'); global.fetch = jest.fn(fetchMock); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se é realizada uma consulta à API com a url correta', async () => {
    renderWith(<Meals />, ['/meals']);
    const firstEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const secondEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(firstEndPoint);
      expect(fetch).toHaveBeenLastCalledWith(secondEndPoint);
    });
  });

  test('Verifica se ao clicar em uma categoria a função fetch é chamada com o a url correta', async () => {
    renderWith(<Meals />, ['/meals']);

    const urlGoat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat';

    await clickOnCategory();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenCalledWith(urlGoat);
    });
  });

  test('Verifica se ao clicar em uma categoria os itens daquela categoria são renderizados na tela', async () => {
    renderWith(<Meals />, ['/meals']);

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
  });
});
