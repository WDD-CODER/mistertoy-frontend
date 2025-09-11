import { toyService } from "../../services/toy.service.js";
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
export async function loadToys(filterBy) {
    // לשים לב באיזה דרך אני מעביר את המידע ממקום אפשר בשתי הדרכים רק לשמור על אחידות ועל פעולה נכונה לפונקציה הרלוונטית!    
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    // אפשרות להשתמש בגישה אופטימיסטית בכידי למנוע פליקרים 
    try {
        const toys = await toyService.query(filterBy)
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

export async function saveToy(toy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toy)
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
    store.dispatch({ type: SET_FILTER_BY, filterBy })
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
export async function removeToy(toyId) {
    if (!confirm('Are you Sure you want to delete the toy?!')) return Promise.reject('toy not deleted!')
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toyId = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
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
