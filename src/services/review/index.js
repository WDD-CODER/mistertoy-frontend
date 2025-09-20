const {DEV, VITE_LOCAL} = import.meta.env

import {reviewService as local } from "./review.service.local.js"
import {reviewService as remote } from "./review.service.remote.js"

const service = (VITE_LOCAL === 'true')? local : remote
export const reviewService = { ...service }

if (DEV) window.reviewService = reviewService

