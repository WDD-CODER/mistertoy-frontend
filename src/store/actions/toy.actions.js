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
export function loadToys(filterBy) {
    // לשים לב באיזה דרך אני מעביר את המידע ממקום אפשר בשתי הדרכים רק לשמור על אחידות ועל פעולה נכונה לפונקציה הרלוונטית!    
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    // אפשרות להשתמש בגישה אופטימיסטית בכידי למנוע פליקרים 
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
            return toys
        })
        .catch(err => {
            console.log('toy.action -> cant get toys}', err)
            throw err
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

// READ

export function setToysLabels() {
    toyService.getToysLabels()
        .then(labels => store.dispatch({ type: SET_LABELS, labels }))
}

export function getToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.getById(toyId)
        .then(toy => {
            store.dispatch({ type: SET_TOY, toy })
            return toy
        })
        .catch(err => {
            console.log('toy action -> cant get toy ', err)
            throw err
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

// CREATE

export function saveToy(toy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toy => {
            store.dispatch({ type, toy })
            return toy
        })
        .catch(err => {
            console.log('toy.action -> cant save toy', err)
            throw err
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))

}

export function setUpdatedBranches(branches) {
    store.dispatch({ type: SET_BRANCHES, branches })
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


export function updateToy(toy) {
    console.log("🚀 ~ updateToy ~ toy:", toy)
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.save(toy)
        .then(toy => {
            store.dispatch({ type: UPDATE_TOY, toy })
            return toy
        })
        .catch(err => {
            console.log('toy.action -> cant add toy label', err)
            throw err
        })
        // .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))


}

// DELETE
export function removeToy(toyId) {
    if (!confirm('Are you Sure you want to delete the toy?!')) return Promise.reject('toy not deleted!')
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .catch(err => {
            console.log('toy.action -> cant remove toy', err)
            throw err
        })

        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))

}


// }


// UTIL 

export const debounceFilterBy = utilService.debounce(
    (filter) => store.dispatch({ type: SET_FILTER_BY, filterBy: filter }),
    500
)
