import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';

const pokemons = [
  { name: 'bulbasaur', sprite: 'bulba.png', cry: 'bulba.ogg' },
  { name: 'charmander', sprite: 'char.png', cry: 'char.ogg' }
];

test('renders pokemon links', () => {
  render(
    <MemoryRouter>
      <PokemonList pokemons={pokemons} />
    </MemoryRouter>
  );

  expect(screen.getByText('bulbasaur')).toHaveAttribute('href', '/bulbasaur');
  expect(screen.getByText('charmander')).toHaveAttribute('href', '/charmander');
});
