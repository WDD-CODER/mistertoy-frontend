const { DEV, VITE_LOCAL } = import.meta.env

import {utilService } from '../util.service.js'

import { userService as local } from '../user/'
import { userService as remote } from './toy.service.remote.js'


const service = (VITE_LOCAL === 'true') ? local : remote
export const toyService = { getEmptyToy, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.toyService = toyService
