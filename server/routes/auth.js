// import packages and functions
import express from 'express'
import { signup, signIn, googleAuth } from '../controllers/auth.js'

const router = express.Router()
// CREATE USER SIGNUP
router.post('/signup', signup)

// SIGN IN USER
router.post('/signin/', signIn)

// GOOGLE AUTH

export default router
