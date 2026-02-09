import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './PokemonCard.css';

function PokemonCard({ pokemon }) {
    return (
        <div className='pokeBackground'>
            <Card className='pokeDetails' style={{ width: '28rem' }} >
                <Card.Img variant="top" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <ListGroup variant="flush">
                    <Card.Header style={{ textTransform: 'capitalize', fontSize: '30px', textAlign: 'center' }}>{pokemon.name}</Card.Header>
                    <ListGroupItem>
                        <Card.Title style={{ fontSize: '30px' }}>Abilities:</Card.Title>
                        <Card.Text style={{ textTransform: 'capitalize' }}>
                            {pokemon.abilities.map(({ ability }) => (
                                <li key={ability.name}>{ability.name}</li>
                            ))}
                        </Card.Text>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Card.Title style={{ fontSize: '30px' }}>Type:</Card.Title>
                        <Card.Text style={{ textTransform: 'capitalize' }}>
                            {pokemon.types.map(({ type }) => (
                                <li key={type.name}>{type.name}</li>
                            ))}
                        </Card.Text>
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link style={{ color: 'black' }} href='/' >Back to PokéList</Card.Link>
                </Card.Body>
            </Card>
        </div>

    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string,
        abilities: PropTypes.arrayOf(PropTypes.shape({
            ability: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired
        })),
        types: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired
        })),
        sprites: PropTypes.shape({
            front_default: PropTypes.string
        })
    })
};

PokemonCard.defaultProps = {
    pokemon: {
        name: '',
        abilities: [],
        types: [],
        sprites: {}
    }
};

export default PokemonCard;
