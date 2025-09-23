import { legacy_createStore as createStore, combineReducers, compose } from "redux"
import { toyReducer } from "./reduce/toy.reduce.js"
import { userReducer } from "./reduce/user.reduce.js"
import { reviewReducer } from "./reduce/review.reduce.js"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
export const store = createStore(rootReducer, middleware)

window.gS