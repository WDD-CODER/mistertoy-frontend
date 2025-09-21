import { reviewService } from "../../services/Review/index.js"

// LIST


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
        return Review
    } catch (err) {
        console.log('Review.action -> cant add Review', err)
        throw err
    }

}


// DELETE
export async function removeReview(reviewIdToRemove) {
    if (!confirm('Are you Sure you want to delete the Review?!')) return Promise.reject('Review not deleted!')
    try {
        const removedReviewId = await reviewService.remove(reviewIdToRemove)
        return removedReviewId
    } catch (err) {
        console.log('Review.action -> cant remove Review', err)
        throw err
    }
}



