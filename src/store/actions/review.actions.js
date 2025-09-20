import { reviewService } from "../../services/Review/index.js"
import { store } from "../store.js"

import {
    REMOVE_REVIEW,
    SET_IS_LOADING,
    SET_REVIEWS
} from "../reduce/review.reduce.js";
'use strict';

// LIST
// export async function loadReviews(reviewId) {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//     try {
//         const Reviews = await reviewService.query(filterBy)
//         return Reviews
//     } catch (err) {
//         console.log('Review.action -> cant get Reviews}', err)
//         throw err
//     }
//     finally { store.dispatch({ type: SET_IS_LOADING, isLoading: false }) }
// }


export async function getToyReviews(aboutToyId) {
    try {
        const Reviews = await reviewService.query({aboutToyId})
        return Reviews
    } catch (err) {
        console.log('Review action -> cant get Review ', err)
        throw err
    }
}

// CREATE

export async function addReview(ReviewToSave) {
    try {
        const Review = await reviewService.add(ReviewToSave)
        console.log("🚀 ~ addReview ~ Review:", Review)
    //     store.dispatch({ type, Review })
        return Review
    } catch (err) {
        console.log('Review.action -> cant add Review', err)
        throw err
    }

}


// UPDATE

// DELETE
export async function removeReview(ReviewIdToRemove) {
    console.log("🚀 ~ removeReview ~ ReviewIdToRemove:", ReviewIdToRemove)
    if (!confirm('Are you Sure you want to delete the Review?!')) return Promise.reject('Review not deleted!')
    try {
        const ReviewId = await reviewService.remove(ReviewIdToRemove)
    } catch (err) {
        console.log('Review.action -> cant remove Review', err)
        throw err
    }
}



