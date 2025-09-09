import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
const BRANCH_KEY = 'branchDB'
_createToys()


export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getPriceStats,
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
    let toys
    try {
        toys = await storageService.query(TOY_KEY)
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

        if (typeof filterBy.inStock === 'boolean') {
            toys = toys.filter(toy => toy.inStock === filterBy.inStock)
        }

        if (filterBy.sortBy) {
            const sortDir = filterBy.sortDir ? -1 : 1
            if (filterBy.sortBy === 'txt') {


                toys = toys.sort((a, b) => a.txt.localeCompare(b.txt) * sortDir)
            }

            if (filterBy.sortBy === 'price') {
                toys = toys.sort((a, b) => (a.price - b.price) * sortDir)
            }

            if (filterBy.sortBy === 'createdAt') {
                toys = toys.sort((a, b) => (a.createdAt - b.createdAt) * sortDir)
            }

        }

    } catch (error) {
        console.log(" Can't load toys")
    }
    finally { return toys }


}

function getBranches() {
    return storageService.query(BRANCH_KEY)
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
        ]
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
        const toys = await storageService.query(TOY_KEY)
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

// async function getById(toyId) {
//     try {
//      const toy = await storageService.get(TOY_KEY, toyId)
//      _setNextPrevToyId(toy)
//         return toy
//     } catch (error) {
//         console.log(" Can't get toy by ID")
//     }
// }


function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function getEmptyToy(txt = '', price = 0) {
    const dates = ["15/10", "30/10", "15/11", "30/11", "15/12", "30/12"]
    return {
        txt,
        imgUrl: "",
        price, labels: [],
        inStock: '',
        color: utilService.getRandomColor(),
        sales: dates.map((date) => ({ date, amount: utilService.getRandomIntInclusive(50, 500) }))
    }
}

function getDefaultFilter() {
    return { txt: '', price: 0, labels: [], inStock: '', sortBy: 'txt', sortDir: false }
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


function getPriceStats() {
    return storageService.query(TOY_KEY)
        .then(toys => {
            const toyCountBypriceMap = _getToyCountByPriceMap(toys)
            const data = Object.keys(toyCountBypriceMap).map(speedName => ({ title: speedName, value: toyCountBypriceMap[speedName] }))
            return data
        })

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

    if (filterBy.txt) sp.set('txt', filterBy.txt)
    if (filterBy.price) sp.set('price', filterBy.price)
    if (filterBy.inStock !== '' && filterBy.inStock !== undefined) {
        sp.set('inStock', filterBy.inStock)
    }
    if (filterBy.labels?.length) {
        sp.set('labels', [...filterBy.labels])
    }
    if (filterBy.sortBy) sp.set('sortBy', filterBy.sortBy)
    if (filterBy.sortDir) sp.set('sortDir', filterBy.sortDir)

    setSearchParams(sp)
}


// UPDATE

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()
        return storageService.post(TOY_KEY, toy)
    }
}

function saveBranches(branches) {
    utilService.saveToStorage(BRANCH_KEY, branches)
}

function saveBranch(branch) {
    if (branch._id) {
        return storageService.put(BRANCH_KEY, branch)
    } else {
        return storageService.post(BRANCH_KEY, branch)
    }
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

// DELETE

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
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


