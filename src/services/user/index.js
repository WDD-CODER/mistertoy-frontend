const { DEV, VITE_LOCAL } = import.meta.env

import { userService as local } from '../user/user.service.local.js'
import { userService as remote } from '../user/user.service.remote.js'

export function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
        isAdmin: false
    }
}


const service = (VITE_LOCAL === 'true') ? local : remote
export const userService = {getEmptyCredentials,  ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.userService = userService
