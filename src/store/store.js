import { legacy_createStore as createStore, combineReducers, compose } from "redux"
import { toyReducer } from "./reduce/toy.reduce.js"
import { userReducer } from "./reduce/user.reduce.js"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
export const store = createStore(rootReducer, middleware)

window.gS