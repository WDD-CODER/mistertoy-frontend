import { toyService } from "../../services/toy.service.remote.js";
import { utilService } from "../../services/util.service.js";
import { store } from "../store.js";

import {
    SET_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_TOYS,
    UPDATE_TOY,
    ADD_TOY,
    SET_LABELS,
    SET_BRANCHES
} from "../reduce/toy.reduce.js";
import { LabelsList } from "../../cmps/LabelsList.jsx";
'use strict';

// LIST
// TODO: לתקן את ההצגה של האפשרות בחירה לליבלים לפי מה שייש במלאי האמיתי ולא רק במה שמוצג
export async function loadToys() {
    const { filterBy } = store.getState().toyModule
    
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        console.log("🚀 ~ loadToys ~ filterBy:", filterBy)
        const toys = await toyService.query(filterBy)
         store.dispatch({ type: SET_LABELS, labels: toyService.getLabelsFromToys(toys) })
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (err) {
        console.log('toy.action -> cant get toys}', err)
        throw err
    }
    finally { store.dispatch({ type: SET_IS_LOADING, isLoading: false }) }
}


// READ

export async function setToysLabels() {
    try {
        const labels = await toyService.getToysLabels()
        store.dispatch({ type: SET_LABELS, labels })
    } catch (err) {
        console.log(" Problem setting labels")
        throw err
    }
}

export async function getToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toy = await toyService.getById(toyId)
        store.dispatch({ type: SET_TOY, toy })
        return toy
    } catch (err) {
        console.log('toy action -> cant get toy ', err)
        throw err
    }
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

export function setFilter(filterBy = toyService.getDefaultFilter()) {
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



// UTIL 

export const debounceFilterBy = utilService.debounce(
    (filter) => store.dispatch({ type: SET_FILTER_BY, filterBy: filter }),
    500
)
