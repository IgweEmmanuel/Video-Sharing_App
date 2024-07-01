// import packages and functions
import jwt from 'jsonwebtoken'
import { createError } from './error.js'

// function to verify the token received from cookie

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return next(createError(401, 'You are not authenticated'))
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'))
    req.user = user
    next() // this tells the programme to conitnue what we want to do which in this case will call the next function
  })
}
