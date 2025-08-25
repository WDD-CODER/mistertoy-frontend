import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getpriceStats,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.txt))
            }

            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
            }

            if (filterBy.labels) {
                if (filterBy.labels.length)
                    toys = toys.filter(toy => {
                        return filterBy.labels.every(label => toy.labels.includes(label))
                    })
            }

            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // TOY - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(txt = '', price = 0) {
    return { txt, imgUrl: "", price, labels: [], inStock: true }
}

function getDefaultFilter() {
    return { txt: '', price: 0, labels: [] }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getpriceStats() {
    return storageService.query(TOY_KEY)
        .then(toys => {
            const toyCountBypriceMap = _getToyCountBypriceMap(toys)
            const data = Object.keys(toyCountBypriceMap).map(speedName => ({ title: speedName, value: toyCountBypriceMap[speedName] }))
            return data
        })

}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const toyNames = [
            'Galactic Glider',
            'Quantum Quacker',
            'Robo-Racer',
            'Sparkle Sprout',
            'Astro-Acorn',
            'Cosmic Cuddlebug',
            'Mythic Monolith',
            'Pixel Petal',
            'Turbo Tumble',
            'Wobble-Whirl'
        ];
        for (let i = 0; i < 10; i++) {
            const txt = toyNames[i]
            toys.push(_createToy(txt, utilService.getRandomIntInclusive(10, 300)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(txt, price) {
    const toy = getEmptyToy(txt, price)
    toy._id = utilService.makeId()

    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

function _getToyCountBypriceMap(toys) {
    const toyCountBypriceMap = toys.reduce((map, toy) => {
        if (toy.price < 3) map.low++
        else if (toy.price < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return toyCountBypriceMap
}


// Data Model:
// const toy = {
// _id: 't101',
// name: 'Talking Doll',
// imgUrl: 'hardcoded-url-for-now',
// price: 123,
// labels: ['Doll', 'Battery Powered', 'Baby'],
// createdAt: 1631031801011,
// inStock: true,
// }
