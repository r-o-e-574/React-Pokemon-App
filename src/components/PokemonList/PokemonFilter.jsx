import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import './PokemonList.css';
import { useDispatch } from 'react-redux';
import { setFilterType } from '../../redux/filterTypeSlice';

function PokemonFilter({ filterTypes }) {
    const dispatch = useDispatch();
    const handleFilter = (filterType) => {
        dispatch(setFilterType(filterType));
    };

    return (
        <div className='pokeList'>
            <Card className='pokeListColor' style={{ width: '20rem' }}>
                <ListGroup variant="flush">
                    <Card.Header style={{ fontSize: '30px' }}>Filter by type</Card.Header>
                    <ListGroupItem>
                        <Card.Text>
                            {filterTypes.map(({ name }) => (
                                <Button key={name} value={name} style={{ color: 'yellow', textTransform: 'capitalize' }} onClick={() => handleFilter(name)} >{name}</Button>
                            ))}
                            <br />
                            <Button onClick={() => handleFilter('')}>All</Button>
                        </Card.Text>
                    </ListGroupItem>
                </ListGroup>
            </Card>
            <br />
        </div>
    );
};

export default PokemonFilter;