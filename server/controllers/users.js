// import user Model
import mongoose from 'mongoose'
import { createError } from '../error.js'
import User from '../models/User.js'

// function for getting users
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
    console.log(user)
  } catch (error) {
    next(createError(403, 'Cannot fetch users'))
  }
}

// function for updating users
export const updates = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      const { password, ...others } = updatedUser._doc
      res.status(200).json(others)
    } catch (err) {
      next(err)
    }
  } else {
    return next(createError(403, 'You can update only your account!'))
  }
}

// function for deleting users
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User deleted Successfully!')
    } catch (err) {
      next(err)
    }
  } else {
    next(createError(403, "You cannot delete someone's account!"))
  }
}

// function for subscribing
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    })
    res.status(200).json('Users subscribed')
  } catch (error) {
    next(createError('Could not subscribe'))
  }
}

// function for unsubscribing
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subcribers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribedUsers: -1 },
    })
    res.status(200).json('unsubscribed')
  } catch (error) {
    next(createError('Could not subscribe'))
  }
}

// // function for liking a video
// export const like = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ _id: req.body._id })
//     res.json(user)
//     console.log(user)
//   } catch (error) {
//     console.log('Error with mongodb: ', error)
//   }
// }

// // function for unliking a video
// export const unlike = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ _id: req.body._id })
//     res.json(user)
//     console.log(user)
//   } catch (error) {
//     console.log('Error with mongodb: ', error)
//   }
// }
