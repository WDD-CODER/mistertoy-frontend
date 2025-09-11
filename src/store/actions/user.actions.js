import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { userService } from "../../services/user.service.js";
import { SET_CREDENTIALS, SET_LOGGED_IN_USER } from "../reduce/user.reduce.js";
import { store } from "../store.js";

export async function loginUser(credentials) {
    try {
        const userDetails = await userService.login(credentials)
        store.dispatch({ type: SET_LOGGED_IN_USER, user })
    } catch (err) {
        console.log("user.actions -> can't login", err)
        throw err
    }
}

export async function signupUser(credentials) {
    try {
        const users = await userService.query()
        const user = users.find(user => user.username === credentials.username)
        if (!user) {
            store.dispatch({ type: SET_CREDENTIALS, credentials })
            const userCredentials = await userService.signup(credentials)
            store.dispatch({ type: SET_LOGGED_IN_USER, user })
        }
        else return Promise.reject(' Username exist already')
    } catch (err) {
        console.log("user.actions -> can't login", err)
    }
}

export async function logout() {
    store.dispatch({ type: LOGGED_OUT })
}

