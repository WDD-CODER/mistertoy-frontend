import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { userService } from "../../services/user";
import { LOGGED_OUT, SET_CREDENTIALS, SET_LOGGED_IN_USER } from "../reduce/user.reduce.js";
import { store } from "../store.js";

export async function loginUser(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_LOGGED_IN_USER, user })
    } catch (err) {
        console.log("user.actions -> can't login", err)
        throw err
    }
}

export async function signupUser(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_CREDENTIALS, credentials })
        store.dispatch({ type: SET_LOGGED_IN_USER, user })
    } catch (err) {
        console.log("user.actions -> can't signup", err)
        throw err
    }
}

export async function logout() {
    userService.logout()
    store.dispatch({ type: LOGGED_OUT })
}

