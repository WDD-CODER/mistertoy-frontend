
export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'


export const SET_REVIEW = 'SET_REVIEW'
// export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    reviews: null,
    review: {},
    isLoading: '',
    // filterBy: reviewService.getDefaultFilter(),
    // maxPage:0
}


export function reviewReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_REVIEWS:
            return { ...state, reviews: cmd.reviews }
        case SET_REVIEW:
            return { ...state, review: cmd.review }
        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }
        case ADD_REVIEW:
            return { ...state, reviews: [...state.reviews, cmd.review] }
        case UPDATE_REVIEW:
            return { ...state, reviews: state.reviews.map(review => review._id === cmd.review._id ? cmd.review : review) }
        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        case SET_FILTER_BY:
            return { ...state, filterBy: ({ ...state.filterBy, ...cmd.filterBy }) }
        case REMOVE_REVIEW:
            return { ...state, reviews: state.reviews.filter(review => review._id !== cmd.reviewIdToRemove) }
        default:
            return state
    }
}

