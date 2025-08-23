import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { userService } from "../../services/user.service.js";
import { SET_CREDENTIALS, SET_LOGGED_IN_USER } from "../reduce/user.reduce.js";
import { store } from "../store.js";

export function loginUser(credentials) {
    return userService.login(credentials)
        .then(user => store.dispatch({ type: SET_LOGGED_IN_USER, user }))
}

export function signupUser(credentials) {
    return userService.query()
        .then(users => users.find(user => user.username === credentials.username))
        .then(user => {
            if (!user) {
                store.dispatch({ type: SET_CREDENTIALS, credentials })
                userService.signup(credentials)
                    .then(user => store.dispatch({ type: SET_LOGGED_IN_USER, user }))
            }
            else return Promise.reject(' Username exist already')
        })
}


//נכון יותר לעשות את הקריאה בשרת ליוזר לםי שם ולעשות שם את הניקוי ואז לשלוח.

