import React, { Fragment } from 'react';

import LagSwitch from './LagSwitch'

function Page({ children }) {
    return (
        <Fragment>
            <LagSwitch />
            { children}
        </Fragment>
    );
};

export default Page;