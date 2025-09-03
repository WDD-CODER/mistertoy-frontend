
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

const Router =
  import.meta.env.MODE === "production" && import.meta.env.VITE_DEPLOY_TARGET === "gh-pages"
    ? HashRouter
    : BrowserRouter

function App() {

    return (
        <>
            <Provider store={store} >
                <Router>
                    <section className="app main-layout">
                        <UserMsg />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home/>} />
                                <Route path="/toy/:toyId" element={<ToyDetails />} />
                                <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                                <Route path="/toy/edit" element={<ToyEdit />} />
                                <Route path="/toy/dashBoard" element={<DashBoard />} />
                                <Route path="/toy" element={<ToyIndex />} />
                            </Routes>
                        </main>
                    </section>
                </Router>
            </Provider>
        </>
    )
}

export default App


