// src/theme.js
import { createTheme } from '@mui/material/styles';
import '@fontsource/rubik-moonrocks/400.css'
import "@fontsource/playpen-sans/400.css"
import "@fontsource/playpen-sans/700.css"


export const customTheme = createTheme({
    palette: {
        primary: {
            light: '#7D3C98',
            main: '#512E5F',
            dark: '#2C003E',
        },
        secondary: {
            light: '#F9E79F',
            main: '#F1C40F',
            dark: '#9A7D0A',
        },
        third: {
            light: '#566573',
            main: '#2C3E50',
            dark: '#17202A',
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
    h5: { color: '#A569BD' },
    h6: { color: '#A569BD' },
    fontFamily: "'Playpen Sans', sans-serif"
 
},


});
