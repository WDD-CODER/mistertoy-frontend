import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
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
}

// LIST

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

            return toys
        })
}


// CREATE


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
    console.log("🚀 ~ _createToy ~ toy:", toy)
    const dates = ["15/10", "30/10", "15/11", "30/11", "15/12", "30/12"]

    toy.sales = dates.map((date)=> {return ({date, amount:utilService.getRandomIntInclusive(50,500)})})
    toy._id = utilService.makeId()

    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

// READ


function getToysLabels() {
    return storageService.query(TOY_KEY)
        .then(getLabelsFromToys)
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




function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}
/// הרגע שיניתי את זה
function getEmptyToy(txt = '', price = 0) {
    // return { txt, imgUrl: "", price, labels: [], inStock: [], color: utilService.getRandomColor() }
    return { txt, imgUrl: "", price, labels: [], inStock: '', color: utilService.getRandomColor() }
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

// UPDATE

export

    function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
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
        return  Math.floor((labelItems.length / totalCount) * 100);
    });

    return percentages;
}


