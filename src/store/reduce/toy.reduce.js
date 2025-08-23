import { toyService } from "../../services/toy.service.js"

export const GET_TOYS = 'GET_TOYS'
export const GET_TOY = 'GET_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const REMOVE_TOY = 'REMOVE_TOY'

const initialState = {
    toys: [],
    toy: {},
    isLoading: '',
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case GET_TOYS:
            return { ...state, toys: cmd.toys }
        case GET_TOY:
            return { ...state, toy: cmd.toy }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] }
        case UPDATE_TOY:
            return { ...state, toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy) }
        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        case SET_FILTER_BY:
            return { ...state, filterBy: ({ ...state.filterBy, ...cmd.filterBy }) }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== cmd.toyId) }
        default:
            return state
    }
}

