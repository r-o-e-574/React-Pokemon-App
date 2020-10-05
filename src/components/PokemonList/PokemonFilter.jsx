import React from 'react';
import PropTypes from 'prop-types'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
// import './PokemonFilter.css'
import { useDispatch } from 'react-redux';
import { setFilterType } from '../../redux/filterTypeSlice'

function PokemonFilter({ filterTypes }) {
    const dispatch = useDispatch();
    // const [pokemonsByType, setPokemonsByType] = useState([]);
    // const isLagging = useSelector(({ lag }) => lag);
    // const selectedFilterType = useSelector(({ filterType }) => filterType)

    const handleFilter = (filterType) => {
        dispatch(setFilterType(filterType))
    }

    return (
        <div>
            <Card className='pokeListColor' style={{ width: '20rem' }}>
                <ListGroup variant="flush">
                    <Card.Header style={{ fontSize: '30px' }}>Filter by type</Card.Header>
                    <ListGroupItem>
                        <Card.Text>
                            {filterTypes.map(({ name }) => (
                                <Button value={name} style={{ color: 'yellow', textTransform: 'capitalize' }} onClick={() => handleFilter(name)} >{name}</Button>
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