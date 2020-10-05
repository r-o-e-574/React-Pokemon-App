import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import { fetchUrl } from '../../api'
import Page from '../Page'

const emptyPokemon = { abilities: [], types: [], sprites: {} };

function PokemonViewData() {
    const { name: pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(emptyPokemon);
    const isLagging = useSelector(({ lag }) => lag);


    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName
        fetchUrl({url, shouldLag: isLagging, callback: (data) => setPokemon(data)});
    }, [isLagging, pokemonName]);
    console.log({pokemon})

    return (
        <Page>
            <PokemonCard pokemon={pokemon} />
        </Page>
    )
};


export default PokemonViewData;