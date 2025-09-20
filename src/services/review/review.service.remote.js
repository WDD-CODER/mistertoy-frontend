import { httpService } from "../http.service"

const REVIEW_URL = 'review/'

export const reviewService = {
    query,
    remove,
    add,
}

async function query(filterBy = {}) {
   return await httpService.get(REVIEW_URL, filterBy)
}

function add(review) {
        review.createdAt = review.updatedAt = Date.now()
        return httpService.post(REVIEW_URL, review)
}

function remove(reviewId) {
    return httpService.delete(REVIEW_URL + reviewId)

}
