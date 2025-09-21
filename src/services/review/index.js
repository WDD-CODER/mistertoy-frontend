const {DEV, VITE_LOCAL} = import.meta.env

import {reviewService as local } from "./review.service.local.js"
import {reviewService as remote } from "./review.service.remote.js"

const service = (VITE_LOCAL === 'true')? local : remote
export const reviewService = { ...service }

if (DEV) window.reviewService = reviewService

//QUESTION האם אנחנו צריכים לבנות סרוויס לוקלי אם אנחנו עובדים מול מונגו מקומי?
// הרי אם אנחנו עובדים מול המונגו הלוקלי שהוא יותר נוח מהלוקל סטורג למה לנו לבנות בכלל את הסרוויס הזה ?