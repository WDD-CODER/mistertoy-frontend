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
<<<<<<< HEAD
    getImportanceStats,
=======
    getpriceStats,
>>>>>>> feat/toy-price-model
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

<<<<<<< HEAD
            if (filterBy.importance) {
                toys = toys.filter(toy => toy.importance >= filterBy.importance)
=======
            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
>>>>>>> feat/toy-price-model
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
<<<<<<< HEAD

function getEmptyToy(txt = '', importance = 5) {
    return { txt, importance, isDone: false }
}

function getDefaultFilter() {
    return { txt: '', importance: 0 }
=======
function getEmptyToy(txt = '', price = 0) {
    return { txt, isDone: false, imgUrl: "./assets/img/react.svg", price, labels: '', }
}

function getDefaultFilter() {
    return { txt: '', price: 0 }
>>>>>>> feat/toy-price-model
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


<<<<<<< HEAD
function getImportanceStats() {
    return storageService.query(TOY_KEY)
        .then(toys => {
            const toyCountByImportanceMap = _getToyCountByImportanceMap(toys)
            const data = Object.keys(toyCountByImportanceMap).map(speedName => ({ title: speedName, value: toyCountByImportanceMap[speedName] }))
=======
function getpriceStats() {
    return storageService.query(TOY_KEY)
        .then(toys => {
            const toyCountBypriceMap = _getToyCountBypriceMap(toys)
            const data = Object.keys(toyCountBypriceMap).map(speedName => ({ title: speedName, value: toyCountBypriceMap[speedName] }))
>>>>>>> feat/toy-price-model
            return data
        })

}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
<<<<<<< HEAD
        const txts = ['Learn React', 'Master CSS', 'Practice Redux']
        for (let i = 0; i < 20; i++) {
            const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
            toys.push(_createToy(txt + (i + 1), utilService.getRandomIntInclusive(1, 10)))
=======
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
        for (let i = 0; i < 20; i++) {
            const txt = toyNames[utilService.getRandomIntInclusive(0, toyNames.length - 1)]
            toys.push(_createToy(txt + (i + 1), utilService.getRandomIntInclusive(10,300)))
>>>>>>> feat/toy-price-model
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

<<<<<<< HEAD
function _createToy(txt, importance) {
    const toy = getEmptyToy(txt, importance)
=======
function _createToy(txt, price) {
    const toy = getEmptyToy(txt, price)
>>>>>>> feat/toy-price-model
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

<<<<<<< HEAD
function _getToyCountByImportanceMap(toys) {
    const toyCountByImportanceMap = toys.reduce((map, toy) => {
        if (toy.importance < 3) map.low++
        else if (toy.importance < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return toyCountByImportanceMap
=======
function _getToyCountBypriceMap(toys) {
    const toyCountBypriceMap = toys.reduce((map, toy) => {
        if (toy.price < 3) map.low++
        else if (toy.price < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return toyCountBypriceMap
>>>>>>> feat/toy-price-model
}


// Data Model:
// const toy = {
<<<<<<< HEAD
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }

=======
// _id: 't101',
// name: 'Talking Doll',
// imgUrl: 'hardcoded-url-for-now',
// price: 123,
// labels: ['Doll', 'Battery Powered', 'Baby'],
// createdAt: 1631031801011,
// inStock: true,
// }
>>>>>>> feat/toy-price-model
