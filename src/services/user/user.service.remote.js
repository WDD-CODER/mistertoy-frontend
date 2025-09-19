import { httpService } from "../http.service"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
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
        console.log("🚀 ~ login ~ loggedInUser:", loggedInUser)
        if (loggedInUser) return _setLoggedinUser(loggedInUser);
        else throw new Error('Invalid login');
    } catch (error) {
        console.log("Problem logging in", error);
        throw error;
    }
}

async function signup({ username, password, fullname, isAdmin }) {
    try {
        const users = await httpService.get(USER_URL)
        if (users.find(user => user.username === username)) {
            throw new Error('username taken, try something else')
        }
        const user = await httpService.post(AUTH_URL + 'signup', { username, password, fullname, isAdmin })
        if (!user) throw new Error('cant save user')
        user.createdAt = user.updatedAt = Date.now()
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.log(' user.service =>', err)
        throw err
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
    const userToSave = { _id: user._id, fullname: user.fullname, username: user.username, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

