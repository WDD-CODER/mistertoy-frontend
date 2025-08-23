import { userService } from "../../services/user.service.js"

export const SET_CREDENTIALS = 'SET_CREDENTIALS'
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

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

        default:
            return state
    }
}