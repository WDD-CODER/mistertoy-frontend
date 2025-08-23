import { toyService } from "../../services/toy.service.js";
import { utilService } from "../../services/util.service.js";
import { store } from "../store.js";

import {
    GET_TOY,
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
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then(toys => store.dispatch({ type: GET_TOYS, toys }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

// READ

export function getToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.get(toyId)
        .then(toy => {
            store.dispatch({ type: GET_TOY, toy })
            return toy
        })
        .catch(err => console.log('err', err)
        )
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

// CREATE

export function saveToy(toy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toy => store.dispatch({ type, toy }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))

}

// UPDATE

export function addToyLabels(toy, ev) {
    const toyLabels = [...toy.labels]
    const addLabel = ev.target.value
    if (toyLabels.includes(addLabel)) return
    toyLabels.push(addLabel)
    const modifiedToy = { ...toy, labels: toyLabels }
    return toyService.save(modifiedToy)
        .then(toy =>{
             store.dispatch({ type: UPDATE_TOY, toy })
            return toy
            })
}


// DELETE
export function removeToy(toyId) {
    if (!confirm('Are you Sure you want to delete the task?!')) return Promise.reject('task not deleted!')
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))

}

export function removeLabel(toy, label) {
    const toyLabels = toy.labels.filter(curLabel => curLabel !== label)
    const modifiedToy = { ...toy, labels: toyLabels }
    return toyService.save(modifiedToy)
        .then(toy =>{
            store.dispatch({ type: UPDATE_TOY, toy })
        return toy    
        })
}

// export function removeLabel(toy, label) {
//     const curToy ={...toy}
//     const toyLabels = toy.labels.filter(curLabel => curLabel !== label)
//     curToy.labels = toyLabels
//     return toyService.save(curToy)
//         .then(toy => store.dispatch({ type: UPDATE_TOY, toy }))
// }



// UTIL 
export function setStateFilterFromSearchParams(searchParams) {
    const defaultFilter = toyService.getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
    return filterBy
}


export const debounceFilterBy = utilService.debounce(
    (filter) => store.dispatch({ type: SET_FILTER_BY, filterBy: filter }),
    500
)
