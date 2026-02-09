import React, { useMemo, useState, useEffect } from 'react';
import { useFetchUrl } from '../../hooks';
import { useSelector } from 'react-redux';
import PokemonList from './PokemonList';
import './PokemonList.css';
import pokeball from '../../img/pokeball.png';
import PokemonFilter from './PokemonFilter';
import Page from '../Page';

const SPECIES_URL_PREFIX = 'https://pokeapi.co/api/v2/pokemon-species/';
const TYPE_URL_PREFIX = 'https://pokeapi.co/api/v2/pokemon/';

const getIdFromUrl = (url, prefix) => Number(url.replace(prefix, '').replace(/\/$/, ''));

function PokemonListData() {
    const [pokemons, setPokemons] = useState([]);
    const [filterTypes, setFilterTypes] = useState([]);
    const [filteredPokemonIds, setFilteredPokemonIds] = useState(null);
    const fetchUrl = useFetchUrl();
    const selectedFilterType = useSelector(({ filterType }) => filterType);

    const filteredPokemon = useMemo(() => {
        if (!filteredPokemonIds) return pokemons;
        return pokemons.filter(({ id }) => filteredPokemonIds.has(id));
    }, [pokemons, filteredPokemonIds]);

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/generation/1'
        fetchUrl(url, ({ types, pokemon_species }) => {
            setFilterTypes(types);
            const pokemonObjects = pokemon_species.map(({ name, url }) => {
                const id = getIdFromUrl(url, SPECIES_URL_PREFIX);
                return { name, url, id };
            });
            setPokemons(pokemonObjects);
        });
    }, [fetchUrl]);

    useEffect(() => {
        if (selectedFilterType) {
            const url = `https://pokeapi.co/api/v2/type/${selectedFilterType}`;
            fetchUrl(url, (data) => {
                const pokemonIdSet = new Set(
                    data.pokemon.map(({ pokemon: { url } }) => getIdFromUrl(url, TYPE_URL_PREFIX))
                );
                setFilteredPokemonIds(pokemonIdSet);
            })
        } else {
            setFilteredPokemonIds(null);
        }
    }, [selectedFilterType, fetchUrl] );

    return (
        <Page>
            <div className='pokeList'>
                <div className='pokeHeader'>
                    Welcome
                <br />
                    <img src={pokeball} alt='pokeball' />
                    <br />
                Pokémon Fans!
            </div>
            </div>
            <PokemonFilter filterTypes={filterTypes} />
            <PokemonList pokemons={filteredPokemon} />
        </Page>
    );
};

export default PokemonListData;
