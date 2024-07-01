// creating the video function for the video api endpoints

// importing our packages and functions
import Video from '../models/Video.js'
import { createError } from '../error.js'
import User from '../models/User.js'

// Add video function
export const addVideo = async (req, res, next) => {
  const newVideo = new Video(req.user.id, ...req.body)
  try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (err) {
    next(err)
  }
}

// update video function
export const updateVideo = async (req, res, next) => {
  try {
    const vidId = await Video.findById(req.params.id)
    if (!vidId) return next(createError(404, 'Video not found!'))
    if (req.user.id === req.vidId.userId) {
      const updatedVid = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedVid)
    } else {
      return next(createError(403, 'Not owner of video!'))
    }
  } catch (err) {
    next(err)
  }
}

// delete video function
export const deleteVideo = async (req, res, next) => {
  try {
    const vidId = Video.findById(req.params.id)
    if (!vidId) return next(createError(404, 'Video not found'))
    if (req.user.id === req.vidId.userId) {
      await Video.findByIdAndDelete(req.params.id)
    } else {
      return next(createError(403, 'You can delete only your video!!!'))
    }
    res.status(200).json('Video deleted successfully')
  } catch (err) {
    next(err)
  }
}

// get video function
export const getVideo = async (req, res, next) => {
  try {
    const vidId = await Video.findById(req.params.id)
    res.status(200).json(vidId)
  } catch (err) {
    next(err)
  }
}

// Add views function
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { view: 1 },
    })
    res.status(200).json('Vies added')
  } catch (err) {
    next(err)
  }
}

// Get 20 random videos function
export const random = async (req, res, next) => {
  try {
    const randomVideos = await Video.aggregate([{ $sampple: { size: 20 } }])
    res.status(200).json(randomVideos)
  } catch (err) {
    next(err)
  }
}

// Get trending videos function
export const trends = async (req, res, next) => {
  try {
    const trendVideo = await Video.find().sort({ views: -1 })
    res.status(200).json(trendVideo)
  } catch (err) {
    next(err)
  }
}

// This function gets all the videos of those that subscribed to a particular channel using their user ids
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const subChannels = user.subscribedUsers
    const list = await Promise.all(
      subChannels.map((chanId) => {
        return Video.find({ userId: req.chanId })
      })
    )
    res.status(200).json(list)
    res.status(200).json(req.user.video)
  } catch (err) {
    next(err)
  }
}

// Like video function
export const likeVideo = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await Video.findById(req.params.id, {
        $push: { like: req.params.id },
      })
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { like: 1 },
      })
      res.status(200).json('You just liked this video')
    } catch (err) {
      next(createError(401, 'You are not signed in!'))
    }
  } else {
    next(createError(404, 'User not found!'))
  }
}

// Unlike video function
export const unLikeVideo = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await Video.findById(req.params.id, {
        $pull: { like: req.params.id },
      })
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { like: -1 },
      })
      res.status(200).json('You just unliked this video')
    } catch (err) {
      next(createError(401, 'You are not signed in!'))
    }
  } else {
    next(createError(404, 'User not found!'))
  }
}
