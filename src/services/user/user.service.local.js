import { storageService } from "../async-storage.service.js"


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
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    try {
        const users = await storageService.query(STORAGE_KEY)
        const user = users.find(user => user.username === username)
        if (user) return _setLoggedinUser(user)
        else return Promise.reject('Invalid login')
    } catch (error) {
        console.log(" Problem logging in")
    }

}

async function signup({ username, password, fullname }) {
    try {
        const users = await storageService.query(STORAGE_KEY)
        if (users.find(user => user.username === username)) {
            throw new Error('username taken, try something else')
        }
        const user = await storageService.post(STORAGE_KEY, { username, password, fullname })
        if (!user) throw new Error('cant save user')
        user.createdAt = user.updatedAt = Date.now()
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.log(' user.service =>',err)
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

