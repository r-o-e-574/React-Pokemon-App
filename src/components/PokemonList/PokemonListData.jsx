import React, { useState, useEffect } from 'react';
import { useFetchUrl } from '../../hooks'
import { useSelector } from 'react-redux'
import PokemonList from './PokemonList'
import PokemonFilter from './PokemonFilter'
import Page from '../Page'

function PokemonListData() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [filterTypes, setFilterTypes] = useState([])
    const fetchUrl = useFetchUrl()
    const selectedFilterType = useSelector(({ filterType }) => filterType)

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/generation/1'
        fetchUrl(url, ({ types, pokemon_species }) => {
            setFilterTypes(types)
            const pokemonObjects = pokemon_species.map(({name, url}) => {
                const id = parseInt(url.replace('https://pokeapi.co/api/v2/pokemon-species/', ''))
                return {name, url, id }
            })
            setPokemons(pokemonObjects)
            setFilteredPokemon(pokemonObjects)
        })
    }, []);

    useEffect(() => {
        if (selectedFilterType) {
            console.log({ selectedFilterType })
            const url = `https://pokeapi.co/api/v2/type/${selectedFilterType}`
            fetchUrl(url, (data) => {
                const pokemonIds = data.pokemon.map(({ pokemon: { url } }) => {
                    return parseInt(url.replace('https://pokeapi.co/api/v2/pokemon/', ''))
                })
                setFilteredPokemon(pokemons.filter(({ id }) => pokemonIds.includes(id)))
            })
        } else {
            setFilteredPokemon(pokemons)
        }
    }, [selectedFilterType, pokemons])


    console.log({ pokemons })


    return (
        <Page>
            <div className='pokeList'>
                <div className='pokeHeader'>
                    Welcome
                <br />
                    {/* <img src={pokeball} alt='pokeball' /> */}
                    <br />
                Pokémon Fans!
            </div>
            </div>
            <PokemonFilter filterTypes={filterTypes} />
            <PokemonList pokemons={filteredPokemon} />
        </Page>
    )
};

export default PokemonListData;