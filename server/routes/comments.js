// import packages and comment function from commen function api endpoint

import express from 'express'
import { comment } from '../controllers/comments.js'

const router = express.Router() // initializes the route to our api function endpoint using express

router.get('/comment', comment) // gets the route

export default router
