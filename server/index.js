// Importing our packages
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/comments.js'
import authRoute from './routes/auth.js'
import cookie from 'cookie-parser'
// Creating our express app

const app = express()
dotenv.config() // for accessing environmental variable
// connecting to mongodb

const connect = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log('Connected to DB')
    })
    .catch((err) => {
      throw err
    })
}
// calling our cookie in express server
app.use(cookie())
// this will allow our app to receive a json response
app.use(express.json())
// getting our user routes to define api base endpoints
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/videos', videoRoute)
app.use('/api/comments', commentRoute)

// Error handling in express using express middleware
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong!'

  return res.status(status).json({
    // we can now use this returned error message everywhere in our code
    success: false,
    status,
    message,
  })
})

// Enable app to listen on port 8900 and run with nodemon

app.listen(3001, () => {
  try {
    console.log('App is Connected!!!')
    connect()
  } catch (error) {
    console.log('error: ', error)
  }
})
