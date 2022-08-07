import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
    brand: {
        50: '#ecefff',
        100: '#cbceeb',
        200: '#a9aed6',
        300: '#888ec5',
        400: '#666db3',
        500: '#4d5499',
        600: '#3c4178',
        700: '#2a2f57',
        800: '#181c37',
        900: '#080819',
    },
};

const config = {
    initialColorMode: localStorage.getItem("theme") || "light",
    useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ChakraProvider>,
    document.getElementById('rajangautam'),
);
