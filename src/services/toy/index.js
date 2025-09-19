const { DEV, VITE_LOCAL } = import.meta.env

import { utilService } from '../util.service.js'

import { toyService as local } from './toy.service.local.js'
import { toyService as remote } from './toy.service.remote.js'

function getEmptyToy(name = '', price = 0) {
    const dates = ["15/10", "30/10", "15/11", "30/11", "15/12", "30/12"]
    return {
        createdAt: new Date().toLocaleDateString() ,
        id: utilService.makeId(),
        name,
        imgUrl: "",
        price,
        labels: [],
        inStock: '',
        msg: [],
        color: utilService.getRandomColor(),
        sales: dates.map((date) => ({ date, amount: utilService.getRandomIntInclusive(50, 500) }))
    }
}


function getDefaultFilter() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: '',
        pageIdx: 0,
        sortBy: 'name',
        sortDir: false
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const toyService = { getEmptyToy, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.toyService = toyService
