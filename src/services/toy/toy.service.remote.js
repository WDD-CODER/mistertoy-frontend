import { utilService } from '../util.service.js'
import { storageService } from '../async-storage.service.js'
import { httpService } from '../http.service.js'
import { useDispatch } from 'react-redux'

const TOY_URL = 'toy/'
const BRANCH_KEY = 'branchDB'
_createToys()



export const toyService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getFilterFromSearchParams,
    getToysLabels,
    getLabelsFromToys,
    getPercentages,
    getBranches,
    createBranches,
    saveBranch,
    saveBranches,
    getStockValues,
    getDemoLabels,
    getStockValueToShow,
    setSearchParamsFromFilter
}

// LIST

async function query(filterBy = {}) {
    return await httpService.get(TOY_URL, filterBy)
}

function getBranches() {
    return storageService.get(BRANCH_KEY)
}


// CREATE

function createBranches() {
    const branches = [
        { name: "Tel-Aviv", location: { lat: 32.0853, lng: 34.7818 }, color: 'blue', rating: 0, _id: utilService.makeId(), src: "https://picsum.photos/seed/Tel-Aviv/400/300" },
        { name: "Pardes-Hanna", location: { lat: 32.4741, lng: 34.9706 }, color: 'red', rating: 0, _id: utilService.makeId(), src: "https://picsum.photos/seed/Pardes-Hanna/400/300" },
        { name: "Haifa", location: { lat: 32.7940, lng: 34.9896 }, color: 'orange', rating: 0, _id: utilService.makeId(), src: "https://picsum.photos/seed/Haifa/400/300" },
        { name: "Beersheba", location: { lat: 31.2529, lng: 34.7915 }, color: 'indigo', rating: 0, _id: utilService.makeId(), src: "https://picsum.photos/seed/Beersheba/400/300" },
        { name: "Eilat", location: { lat: 29.5577, lng: 34.9519 }, color: 'pink', rating: 0, _id: utilService.makeId(), src: "https://picsum.photos/seed/Eilat/400/300" },
        { name: "Herzliya", location: { lat: 32.1663, lng: 34.8436 }, color: 'green', rating: 0, _id: utilService.makeId(), src: "https://picsum.photos/seed/Herzliya/400/300" },
    ];
    utilService.saveToStorage(BRANCH_KEY, branches)

    return branches
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_URL)
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
        ]
        for (let i = 0; i < 10; i++) {
            const name = toyNames[i]
            toys.push(_createToy(name, utilService.getRandomIntInclusive(10, 300)))
        }
        // utilService.saveToStorage(TOY_URL, toys)
    }
}

function _getEmptyToy(name = '', price = 0) {
    const dates = ["15/10", "30/10", "15/11", "30/11", "15/12", "30/12"]
    return {
        id: utilService.makeId(),
        name,
        imgUrl: "",
        price, labels: [],
        inStock: '',
        color: utilService.getRandomColor(),
        sales: dates.map((date) => ({ date, amount: utilService.getRandomIntInclusive(50, 500) }))
    }
}


function _createToy(name, price) {
    const toy = _getEmptyToy(name, price)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

// READ
function getStockValues() {
    return ['All', 'Available', 'Unavailable']
}
function getDemoLabels() {
    return [
        "on-wheels",
        "box-game",
        "art",
        "baby",
        "doll",
        "puzzle",
        "out-door",
        "battery-powered"
    ]
}

async function getToysLabels() {
    try {
        const toys = await httpService.get(TOY_URL)
        return getLabelsFromToys(toys)
    } catch (error) {
        console.log("Couldn't get toys labels")
    }
}

function getLabelsFromToys(toys) {
    const labels = []
    toys.forEach(toy => {
        (toy.labels || []).forEach(label => {
            if (!labels.includes(label)) labels.push(label)
        })
    })
    return labels
}

// async function getLabelsFromToys22() {
//     try {
//         const toys = await httpService.get(TOY_URL)
//         const toyLabels = []
//         toys.forEach(toy => {
//             (toy.labels || []).forEach(label => {
//                 if (!toyLabels.includes(label)) toyLabels.push(label)
//             })
//         })
//         return toyLabels
//     } catch (err) {
//         console.log('toy.srvice.remote -> cant load labels', err)
//     }
// }


async function getById(toyId) {
    try {
        const toy = await httpService.get(TOY_URL + toyId)
        _setNextPrevToyId(toy)
        return toy
    } catch (error) {
        console.log(" Can't get toy by ID")
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

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === 'labels') filterBy[field] = filterBy[field] ? searchParams.getAll(field) : []
        else filterBy[field] = searchParams.get(field) || ''
        return filterBy
    }
}



function _getToyCountByPriceMap(toys) {
    const toyCountBypriceMap = toys.reduce((map, toy) => {
        if (toy.price < 3) map.low++
        else if (toy.price < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return toyCountBypriceMap
}

function getStockValueToShow(item) {
    if (item.inStock === '') return 'all'
    else if (item.inStock === false) return 'unavailable'
    else return 'available'
}

function setSearchParamsFromFilter(filterBy, setSearchParams) {
    const sp = new URLSearchParams()

    if (filterBy.name) sp.set('name', filterBy.name)
    if (filterBy.price) sp.set('price', filterBy.price)
    if (filterBy.inStock !== '' && filterBy.inStock !== undefined) {
        sp.set('inStock', filterBy.inStock)
    }
    if (filterBy.labels?.length) {
        sp.set('labels', filterBy.labels.join(','))
    }
    if (filterBy.sortBy) sp.set('sortBy', filterBy.sortBy)
    if (filterBy.sortDir) sp.set('sortDir', filterBy.sortDir)

    setSearchParams(sp)
}


// UPDATE

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return httpService.put(TOY_URL + toy._id, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()
        return httpService.post(TOY_URL, toy)
    }
}

function saveBranches(branches) {
    utilService.saveToStorage(BRANCH_KEY, branches)
}

function saveBranch(branch) {
    if (branch._id) {
        return httpService.put(BRANCH_KEY, branch)
    } else {
        return httpService.post(BRANCH_KEY, branch)
    }
}


async function _setNextPrevToyId(toy) {
    try {
        const toys = await httpService.get(TOY_URL)
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    } catch (error) {
        console.log(" Problem setting next page toy")
    }
}

// DELETE

function remove(toyId) {
    return httpService.delete(TOY_URL + toyId)
}

function getPercentages(groupedItems) {
    const allItems = Object.values(groupedItems).flat();
    const totalCount = allItems.length;

    if (totalCount === 0) {
        return [];
    }

    const percentages = Object.values(groupedItems).map(labelItems => {
        return Math.floor((labelItems.length / totalCount) * 100);
    });

    return percentages;
}


