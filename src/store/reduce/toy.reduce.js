import { toyService } from "../../services/toy"

export const SET_TOYS = 'SET_TOYS'
export const SET_BRANCHES = 'SET_BRANCHES'
export const SET_LABELS = 'SET_LABELS'
export const SET_TOY = 'SET_TOY'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const REMOVE_TOY_MSG = 'REMOVE_TOY_MSG'

const initialState = {
    toys: null,
    toy: {},
    branches: toyService.createBranches(),
    isLoading: '',
    labels: [],
    filterBy: toyService.getDefaultFilter(),
    maxPage:0
}


export function toyReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys }
        case SET_BRANCHES:
            return { ...state, branches: cmd.branches }
        case SET_LABELS:
            return { ...state, labels: cmd.labels }
        case SET_TOY:
            return { ...state, toy: cmd.toy }
        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] }
        case UPDATE_TOY:
            return { ...state, toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy) }
        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        case SET_FILTER_BY:
            return { ...state, filterBy: ({ ...state.filterBy, ...cmd.filterBy }) }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== cmd.toyIdToRemove) }
        case REMOVE_TOY_MSG:
            return { ...state, toy:({ ...state.toy, msgs:state.toy.msg.filter(msg => msg.id !== cmd.id)}) }
        default:
            return state
    }
}

