import { reviewService } from "../../services/review/index.js"
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from "../reduce/review.reduce.js"
import { store } from "../store.js"

// LIST


export async function loadReviews() {
    try {
        const reviews = await reviewService.query()
        store.dispatch({ type: SET_REVIEWS, reviews })
        return reviews
    } catch (err) {
        console.log('Review action -> cant get Reviews ', err)
        throw err
    }
}

export async function loadToyReviews(aboutToyId) {
    try {
        const reviews = await reviewService.query({ aboutToyId })
        store.dispatch({ type: SET_REVIEWS, reviews })
        return reviews
    } catch (err) {
        console.log('Review action -> cant get toy Reviews ', err)
        throw err
    }
}
export async function loadUserReviews(byUserId) {
    try {
        const reviews = await reviewService.query({ byUserId })
        store.dispatch({ type: SET_REVIEWS, reviews })
        return reviews
    } catch (err) {
        console.log('Review action -> cant get toy Reviews ', err)
        throw err
    }
}

// CREATE

export async function addReview(ReviewToAdd) {
    try {
        const review = await reviewService.add(ReviewToAdd)
        console.log("🚀 ~ addReview ~ review:", review)
        store.dispatch(getActionAddReview(review))
        return review
    } catch (err) {
        console.log('Review.action -> cant add Review', err)
        throw err
    }

}


// DELETE
export async function removeReview(reviewIdToRemove) {
    try {
        const removedReviewId = await reviewService.remove(reviewIdToRemove)
        store.dispatch(getActionRemoveReview(reviewIdToRemove))
        return removedReviewId
    } catch (err) {
        console.log('Review.action -> cant remove Review', err)
        throw err
    }
}


export function getActionRemoveReview(reviewId) {
    return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
    return { type: ADD_REVIEW, review }
}

