// import packages and functions
import express from 'express'
import { signUp, signIn, googleAuth } from '../controllers/auth.js'

const router = express.Router()
// CREATE USER SIGNUP
router.post('/signup', signUp)

// SIGN IN USER
router.post('/signin', signIn)

// GOOGLE AUTH
router.post('/signin', googleAuth)

export default router
