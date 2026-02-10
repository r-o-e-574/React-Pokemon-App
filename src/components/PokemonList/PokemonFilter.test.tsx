import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonFilter from './PokemonFilter';

test('renders filter controls', () => {
  render(
    <PokemonFilter
      typeOptions={[{ name: 'fire' }, { name: 'water' }]}
      regionOptions={[{ name: 'kanto' }, { name: 'galar' }]}
      selectedTypes={['fire']}
      selectedRegions={['kanto']}
      searchTerm='pik'
      onTypeSelect={() => {}}
      onRegionSelect={() => {}}
      onRemoveType={() => {}}
      onRemoveRegion={() => {}}
      onClearSearch={() => {}}
    />
  );

  expect(screen.getByLabelText('Type')).toBeInTheDocument();
  expect(screen.getByLabelText('Region')).toBeInTheDocument();
  expect(screen.getByText('kanto')).toBeInTheDocument();
  expect(screen.getByText('fire')).toBeInTheDocument();
  expect(screen.getByText(/search: pik/i)).toBeInTheDocument();
});
