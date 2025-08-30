import { toyService } from "../../services/toy.service.js";
import { utilService } from "../../services/util.service.js";
import { store } from "../store.js";

import {
    SET_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_IS_LOADING,
    GET_TOYS,
    UPDATE_TOY,
    ADD_TOY
} from "../reduce/toy.reduce.js";
'use strict';

// LIST
export function loadToys(filterBy) {
    // לשים לב באיזה דרך אני מעביר את המידע ממקום אפשר בשתי הדרכים רק לשמור על אחידות ועל פעולה נכונה לפונקציה הרלוונטית!    
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    // אפשרות להשתמש בגישה אופטימיסטית בכידי למנוע פליקרים 
    return toyService.query(filterBy)
        .then(toys =>{
            store.dispatch({ type: GET_TOYS, toys })
        return toys    
        })
        .catch(err => {
            console.log('toy.action -> cant get toys}', err)
            throw err
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

// READ

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

// UPDATE

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}


export function updateToy(toy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.save(toy)
        .then(toy => {
            store.dispatch({ type: UPDATE_TOY, toy })
            return toy
        })
        .catch(err => {
            console.log('toy.action -> cant add toy label', err)
            throw err
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))


}

// DELETE
export function removeToy(toyId) {
    if (!confirm('Are you Sure you want to delete the task?!')) return Promise.reject('task not deleted!')
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
