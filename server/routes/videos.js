import express from 'express'
import { video } from '../controllers/videos.js'

const router = express.Router()

router.get('/video', video)

export default router
