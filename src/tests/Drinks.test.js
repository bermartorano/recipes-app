import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWith } from './helpers/renderWith';
import { openSearchBar, searchOnSearchBar } from './helpers/interactionHelpers';

import { fetchMock } from './mock/fetchMock';
import { ALL_CATEGORIES_DRINKS, DRINKS } from './mock/mockDrinkAPI';

import Drinks from '../pages/Drinks';

describe('Sequência de testes relacionadas à renderização de elementos da página <drinks />', () => {
  beforeEach(() => { global.fetch = jest.fn(fetchMock); renderWith(<Drinks />, ['/drinks']); });

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
      screen.getByTestId(/drinks-bottom-btn/),
    ];

    // Verificar os valores, a existência, etc desses elementos da tela
    footerElements.forEach((eachElement) => {
      expect(eachElement).toBeInTheDocument();
    });
  });

  test('Verifica se os elementos do componente <Recipes /> são renderizados na tela', async () => {
    const { drinks } = ALL_CATEGORIES_DRINKS;

    await waitFor(() => {
      const allCategories = screen.getByTestId(/^All-category-filter$/);
      expect(allCategories).toBeInTheDocument();
      expect(allCategories).toBeChecked();

      const allCardsByClass = document.querySelectorAll('.card-recipe');
      expect(allCardsByClass).toHaveLength(12);

      for (let index = 0; index <= 4; index += 1) {
        const categoryName = drinks[index].strCategory;

        const eachCategory = screen.getByTestId(`${categoryName}-category-filter`);
        expect(eachCategory).toBeInTheDocument();
        expect(eachCategory).not.toBeChecked();
      }

      for (let index = 0; index <= 11; index += 1) {
        const eachCardElement = screen.getByTestId(`${index}-recipe-card`);
        const imgElement = screen.getByTestId(`${index}-card-img`);
        const nameElement = screen.getByTestId(`${index}-card-name`);

        const getFoodName = DRINKS.drinks[index].strDrink;
        const getFoodImage = DRINKS.drinks[index].strDrinkThumb;

        expect(eachCardElement).toBeInTheDocument();
        expect(imgElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', getFoodImage);
        expect(nameElement).toHaveTextContent(getFoodName);
      }
    });
  });

  test('Verifica se ao clicar no ícone de pesquisa são renderizados os elementos do componente <SearchBar />', () => {
    openSearchBar();

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

describe('Verifica funcionalidades de roteamento dos componentes da página <drinks />', () => {
  beforeEach(() => { jest.spyOn(global, 'fetch'); global.fetch = jest.fn(fetchMock); });

  afterEach(() => { jest.clearAllMocks(); });

  test('Verifica se quando retornar, da consulta à API, apenas um resultado o usuário é redirecionado', async () => {
    const { history } = renderWith(<Drinks />, ['/drinks']);

    await screen.findByTestId('Other / Unknown-category-filter');

    openSearchBar();
    searchOnSearchBar('y', /^first-letter-search-radio$/);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/17219');
    });
  });

  test('Verifica se ao clicar em algum dos cards da página de receitas o usuário é redirecionado para a rota correta', async () => {
    const { history } = renderWith(<Drinks />, ['/drinks']);
    await waitFor(() => {
      const cardElement = screen.queryByTestId('4-recipe-card');
      userEvent.click(cardElement);
    });

    await waitFor(() => { expect(history.location.pathname).toBe('/drinks/13938'); });
  });

  test('Verifica se ao clicar nos elementos do <Footer /> a página é redirecionada', () => {
    const { history } = renderWith(<Drinks />, ['/drinks']);

    const drinkIcon = screen.getByTestId(/^drinks-bottom-btn$/);
    const mealIcon = screen.getByTestId(/^meals-bottom-btn$/);

    userEvent.click(mealIcon);

    expect(history.location.pathname).toBe('/meals');

    userEvent.click(drinkIcon);

    expect(history.location.pathname).toBe('/drinks');
  });
});
