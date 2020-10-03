import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PokemonList from './PokemonList'
import { fetchUrl } from '../../api'
import Page from '../Page'
import PokemonFilter from '../PokemonFilter'


function PokemonListData() {
    const [pokemons, setPokemons] = useState([]);
    const isLagging = useSelector(({ lag }) => lag);
    

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
        fetchUrl({ url, shouldLag: isLagging, callback: ({ results }) => setPokemons(results) })
        
    }, [isLagging]);

    
    console.log({pokemons})
    

    return (
        <Page>
            <PokemonFilter />
            <PokemonList pokemons={pokemons}  />
        </Page>
    )
};

export default PokemonListData;