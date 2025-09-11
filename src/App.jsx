
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom'
import { Provider } from "react-redux"

import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"

import './assets/style/main.css'
import { store } from './store/store'
import { UserMsg } from './cmps/UserMsg.jsx'
import { DashBoard } from './pages/DashBoard.jsx'
import { Home } from './pages/Home.jsx'
import { Loader } from './cmps/Loader.jsx'
import PartsCmp from './cmps/PartsCmp.jsx'
import { Container, ThemeProvider } from '@mui/material'
import { customTheme } from './assets/style/theme/theme.js'
import { LoginSignup } from './cmps/LoginSignup.jsx'
const Router =
    import.meta.env.MODE === "production" && import.meta.env.VITE_DEPLOY_TARGET === "gh-pages"
        ? HashRouter
        : BrowserRouter

function App() {

    return (
        <>
            <Provider store={store} >
                <Router>
                    <ThemeProvider theme={customTheme}>
                        <Container sx={{padding:1,  width: '100vw' , height:'100vh'}} className="app main-layout">
                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                                    <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                                    <Route path="/toy/edit" element={<ToyEdit />} />
                                    <Route path="/toy/dashBoard" element={<DashBoard />} />
                                    <Route path="/toy" element={<ToyIndex />} />
                                    <Route path="/auth" element={<LoginSignup />} />
                                    <Route path="/parts" element={<PartsCmp />} />
                                </Routes>
                            </main>
                        </Container>
                        <UserMsg />
                        <Loader />
                    </ThemeProvider>
                </Router>
            </Provider>
        </>
    )
}

export default App


