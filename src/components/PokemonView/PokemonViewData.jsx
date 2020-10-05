import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { useFetchUrl } from '../../hooks';
import Page from '../Page';

const emptyPokemon = { abilities: [], types: [], sprites: {} };

function PokemonViewData() {
    const { name: pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(emptyPokemon);
    const fetchUrl = useFetchUrl();

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName
        fetchUrl(url, (data) => setPokemon(data));
    }, [pokemonName]);

    return (
        <Page>
            <PokemonCard pokemon={pokemon} />
        </Page>
    );
};


export default PokemonViewData;