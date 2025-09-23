import { toyService } from "../../services/toy"
import { utilService } from "../../services/util.service.js"
import { store } from "../store.js"

import {
    SET_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_TOYS,
    UPDATE_TOY,
    ADD_TOY,
    SET_LABELS,
    SET_BRANCHES,
    SET_MAX_PAGE,
    ADD_TOY_MSG,
    REMOVE_TOY_MSG
} from "../reduce/toy.reduce.js";
'use strict';

// LIST
export async function loadToys() {
    const { filterBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const { toys, maxPage } = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        store.dispatch({ type: SET_MAX_PAGE, maxPage: maxPage })
        return toys
    } catch (err) {
        console.log('toy.action -> cant get toys}', err)
        throw err
    }
    finally { store.dispatch({ type: SET_IS_LOADING, isLoading: false }) }
}

export async function loadToysLabels() {
    const { toys } = store.getState().toyModule

    const labels = toyService.getLabelsFromToys(toys)
    store.dispatch({ type: SET_LABELS, labels: labels })
}
//FIXME יש לסדר את נושא רנדור הלייבלים בפילטר

// READ

// export async function setToysLabels() {
//     try {
//         const labels = await toyService.getToysLabels()
//         store.dispatch({ type: SET_LABELS, labels })
//     } catch (err) {
//         console.log(" Problem setting labels")
//         throw err
//     }
// }

export async function getToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toy = await toyService.getById(toyId)
        store.dispatch(getActionSetToy(toy))
        return toy
    } catch (err) {
        console.log('toy action -> cant get toy ', err)
        throw err
    }
    finally { store.dispatch({ type: SET_IS_LOADING, isLoading: false }) }
}

// CREATE

export async function saveToy(toyToSave) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
        return toy
    } catch (err) {
        console.log('toy.action -> cant save toy', err)
        throw err
    }
    finally { store.dispatch({ type: SET_IS_LOADING, isLoading: false }) }

}

export function setUpdatedBranches(branches) {
    try {
        store.dispatch({ type: SET_BRANCHES, branches })
        toyService.saveBranches(branches)
    } catch (err) {
        console.log('toy.actions -> cant update branches', err)
        throw err
    }
}

// UPDATE

export function setFilter(filterBy) {
    if (!filterBy) {
        console.log('!filterBy', filterBy)
        filterBy = toyService.getDefaultFilter()
    }

    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}


export async function updateToy(toyToUpdate) {
    try {
        const toy = await toyService.save(toyToUpdate)
        store.dispatch({ type: UPDATE_TOY, toy })
        return toy
    } catch (err) {
        console.log('toy.action -> cant update Toy', err)
        throw err
    }
}

export async function onAddToyMsg(toyId, userMsg) {
    try {
        const toy = await toyService.saveToyMsg(toyId, userMsg)
        console.log("🚀 ~ onAddToyMsg ~ toy:", toy)
        store.dispatch({ type: SET_TOY, toy })
        return toy
    } catch (err) {
        console.log('toy.action -> cant save Msg to Toy', err)
        throw err
    }
}


// DELETE
export async function removeToy(toyIdToRemove) {
    if (!confirm('Are you Sure you want to delete the toy?!')) return Promise.reject('toy not deleted!')
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toyId = await toyService.remove(toyIdToRemove)
        store.dispatch({ type: REMOVE_TOY, toyIdToRemove })
    } catch (err) {
        console.log('toy.action -> cant remove toy', err)
        throw err
    }
    finally { store.dispatch({ type: SET_IS_LOADING, isLoading: false }) }
}

export async function onDeleteToyMsg(toyId, msgId) {
    try {
        const removedMsgId = await toyService.removeToyMsg(toyId, msgId)
        store.dispatch({ type: REMOVE_TOY_MSG, msgId })
        return removedMsgId
    } catch (err) {
        console.log('toy.action -> cant remove msg from toy', err)
        throw err
    }
}

// UTIL 

export const debounceFilterBy = utilService.debounce(
    (filter) => store.dispatch({ type: SET_FILTER_BY, filterBy: filter }),
    500
)

export function getActionSetToy(toy) {
    return { type: SET_TOY, toy }
}
