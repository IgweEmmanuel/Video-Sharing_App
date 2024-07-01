// importing our packages and endpoint function for user

import express from 'express'
import {
  getUser,
  updates,
  subscribe,
  unsubscribe,
  deleteUser,
} from '../controllers/users.js'
/* this verify token is used to authenticate users
before they can carry out any opertion on the database
*/
import { verifyToken } from '../verifyToken.js'

const router = express.Router() // initialize our route the the endpoint using express

router.get('/find/:id', getUser) // getting the user route

router.put('/:id', verifyToken, updates) // updating the user route

router.delete('/:id', verifyToken, deleteUser) // delete user route

router.put('/subscribe/:id', verifyToken, subscribe) // subscribe user route

router.put('/unsubscribe/:id', verifyToken, unsubscribe) // unsubscribe user route

// router.put('/like/:vidId', verifyToken, like) // like user route

// router.put('/unlike/:vidId', verifyToken, unlike) // unlike user route

export default router
