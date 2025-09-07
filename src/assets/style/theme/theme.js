// src/theme.js
import { createTheme } from '@mui/material/styles';
import '@fontsource/rubik-moonrocks/400.css'

export const customTheme = createTheme({
    palette: {
        primary: {
            light: '#58D68D',
            main: '#2ECC71',
            dark: '#27AE60',
        },
        secondary: {
            light: '#A569BD',
            main: '#8E44AD',
            dark: '#6C3483',
        },
        third: {
            light: '#333333',
            main: '#1A1A1A',
            dark: '#000000',
        },
        alert: {
            light: '#EF5350',  
            main: '#D32F2F',  
            dark: '#B71C1C',  
        },
        success: {
            light: '#58D68D',
            main: '#2ECC71',
            dark: '#27AE60',
        }
    },

    typography: {
        h1: { color: '#A569BD' },
        h2: { color: '#A569BD' },
        h3: { color: '#A569BD' },
        h4: { color: '#A569BD' },
        fontFamily: 'Rubik Moonrocks, Arial, sans-serif',
    },

});
