import { screen, waitFor } from '@testing-library/react';

import { renderWith } from './helpers/renderWith';

import { fetchMock } from './mock/fetchMock';
import { ALL_CATEGORIES_FOODS } from './mock/mockFoodAPI';

import Meals from '../pages/Meals';

describe('Sequência de testes relacionadas à página <App />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test('Verifica se os elementos html do componente <Header /> são renderizados na página', () => {
    renderWith(<Meals />, ['/meals']);

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
    // Renderizar a página que o componente se encontra
    renderWith(<Meals />, ['/meals']);

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

  test('Verifica se os elementos html do componente <Recipes /> são renderizados na tela', async () => {
    renderWith(<Meals />, ['/meals']);

    await waitFor(() => {
      const allCategories = screen.getByTestId(/^All-category-filter$/);
      expect(allCategories).toBeInTheDocument();
      expect(allCategories).toHaveTextContent('All');

      for (let index = 0; index <= 11; index += 1) {
        const categoryName = ALL_CATEGORIES_FOODS.meals[index].strCategory;

        if (index <= 4) {
          const eachCategory = screen
            .getByTestId(`${categoryName}-category-filter`);
          expect(eachCategory).toBeInTheDocument();
          expect(eachCategory).toHaveTextContent(categoryName);
        }


      }
    });
  });
});
