import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import './PokemonList.css'

function PokemonList({ pokemons }) {


    return (
        <div className='pokeList'>
            <Card className='pokeListColor' style={{ width: '20rem' }}>

                <ListGroup variant="flush">
                    <Card.Header style={{ fontSize: '30px' }}>Who are these Pokémon?</Card.Header>
                    <ListGroupItem>
                        <Card.Text>
                            {pokemons.map(({ name: pokeName }) => (
                                <li><Link style={{ textTransform: 'capitalize' }} className='pokeList' to={`/${pokeName}`}>{pokeName}</Link></li>
                            ))}
                        </Card.Text>
                    </ListGroupItem>
                </ListGroup>

            </Card>

        </div>
    );
};

PokemonList.propTypes = {
    pokemons: PropTypes.instanceOf(Object)
};

PokemonList.defaultProps = {
    pokemons: {
        pokemon_species: [],
        types: []
    }
};

export default PokemonList;