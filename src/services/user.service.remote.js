import { httpService } from "./http.service"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials
}
const STORAGE_KEY_LOGGEDIN = 'user'

const AUTH_URL = 'auth/'
const USER_URL = 'user/'

function query() {
    return httpService.get(USER_URL)
}

function getById(userId) {
    return httpService.get(USER_URL + userId)
}

async function login({ username, password }) {
    try {
        const user = { username, password };
        const loggedInUser = await httpService.post(AUTH_URL + 'login', user);
        if (loggedInUser) return _setLoggedinUser(loggedInUser);
        else throw new Error('Invalid login');
    } catch (error) {
        console.log("Problem logging in", error);
        throw error;
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    user.createdAt = user.updatedAt = Date.now()
    try {
        const signedInUser = await httpService.post(AUTH_URL + 'signup', user)
        _setLoggedinUser(signedInUser)
    } catch (error) {
        console.log(error, " Can't sign up")
        throw error
    }
}


function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }