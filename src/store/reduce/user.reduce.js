import { userService } from "../../services/user.service.js"

export const SET_CREDENTIALS = 'SET_CREDENTIALS'
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
export const LOGGED_OUT = 'LOGGED_OUT'

const initialState = {
    credentials: userService.getEmptyCredentials(),
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
            case SET_CREDENTIALS:
                console.log('SET_CREDENTIALS')
            return { ...state, credentials: cmd.credentials }

        case SET_LOGGED_IN_USER:
            console.log('SET_LOGGED_IN_USER')
            return { ...state, loggedinUser: cmd.user }

        case LOGGED_OUT:
            console.log('LOGGED_OUT')
            return { ...state, loggedinUser: '' }


        default:
            return state
    }
}