import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../redux/lagSlice';

function LagSwitch() {
    const dispatch = useDispatch();
    const isLagging = useSelector(({ lag }) => lag);

    const toggleLag = () => {
        dispatch(toggle());
    };

    return (
        <div >
            <input value={isLagging} type="checkbox" onChange={toggleLag} /> NetworkLag
        </div>
    );

};

export default LagSwitch;
