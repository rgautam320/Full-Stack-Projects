import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="loader">
            <figure>
                <InfinitySpin color="lightblue" className="loader-inside" />
            </figure>
        </div>
    );
};

export default Loader;
