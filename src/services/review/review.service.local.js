import { storageService } from "../async-storage.service"

const REVIEW_URL = 'review/'

export const reviewService = {
    query,
    remove,
    add,
}

async function query(filterBy = {}) {
   return await storageService.get(REVIEW_URL, filterBy)
}

function add(review) {
        review.createdAt = review.updatedAt = Date.now()
        return storageService.post(REVIEW_URL, review)
}

function remove(reviewId) {
    return storageService.delete(REVIEW_URL + reviewId)

}
