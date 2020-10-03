import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { fetchUrl } from '../../api';
import './PokemonFilter.css'
import pokeball from '../../img/pokeball.png'

function PokemonFilter() {
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const isLagging = useSelector(({ lag }) => lag);

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/type'
        fetchUrl({ url, shouldLag: isLagging, callback: ({ results }) => setPokemonTypes(results) });
    }, [isLagging]);
    
    console.log({pokemonTypes})

    return (
        <div className='pokemonListView'>
            <div className='pokeHeader'>
                Welcome
                <br />
                <img src={pokeball} alt='pokeball' />
                <br />
                Pokémon Fans!
            </div>
            <div className='pokeList'>
                <Card className='pokeListColor' style={{ width: '20rem' }}>
                    <ListGroup variant="flush">
                        <Card.Header style={{ fontSize: '30px' }}>Filter by type</Card.Header>
                        <ListGroupItem>
                            <Card.Text>
                                {pokemonTypes.map(({ name: type }) => (
                                    <Button value={type} style={{ color: 'yellow', textTransform: 'capitalize' }} >{type}</Button>
                                ))}
                                <br/>
                                <Button href='/'>All</Button>
                            </Card.Text>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
                <br />
            </div>
        </div>

    )
}

export default PokemonFilter;