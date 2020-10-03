import React, { Fragment } from 'react';

import PokemonFilter from './PokemonFilter'

function Filter({ children }) {
    return (
        <Fragment>
            <PokemonFilter/>
            { children }
        </Fragment>
    )
}

export default Filter;