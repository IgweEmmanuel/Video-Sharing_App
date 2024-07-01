// import packages like mongoose and user model to authenticate user
import mongoose from 'mongoose'
import UserModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'
// import { keygen } from '../keygen.js'

// we create the signup function
export const signUp = async (req, res, next) => {
  // console.log(req.body)
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new UserModel({ ...req.body, password: hash })
    await newUser.save()
    res.status(200).send('User has been created')
  } catch (error) {
    next(error)
    console.log('Error creating new user: ', error)
  }
}

// Creating the sign in function
export const signIn = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name })
    if (!user) return next(createError(404, 'User not found!'))
    const passcomp = await bcrypt.compare(req.body.password, user.password)
    if (!passcomp) return next(createError(400, 'User not found!'))

    // keygen()
    const token = jwt.sign({ id: user._id }, process.env.JWT)

    const { password, email, ...others } = user._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others)
  } catch (error) {
    next(error)
  }
}

export const googleAuth = (req, res) => {
  res.json('google auths')
}
