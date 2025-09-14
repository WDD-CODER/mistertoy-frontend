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
    const user = { username, password }
    try {
        const users = await httpService.post(AUTH_URL + 'login', user)
        console.log("🚀 ~ login ~ users:", users)
        const user = users.find(user => user.username === username)
        if (user) return _setLoggedinUser(user)
        else return Promise.reject('Invalid login')
    } catch (error) {
        console.log(" Problem logging in")
        throw error
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

// user.service.remote.js
// async function signup({ username, password, fullname }) {
//     const user = { username, password, fullname }
//     user.createdAt = user.updatedAt = Date.now()
//     try {
//         const user = await httpService.post('userDB', user)
//         _setLoggedinUser(user)
//         return user
//     } catch (error) {
//         console.log(" Can't sign up", error)
//         throw error // <-- IMPORTANT: Make sure to re-throw the error here
//     }
// }


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