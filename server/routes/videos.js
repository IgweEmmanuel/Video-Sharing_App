// importing our packages and video function for the video endpoint

import express from 'express'
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  sub,
  likeVideo,
  unLikeVideo,
  trends,
  random
} from '../controllers/videos.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router() // initialize our express route

router.post('/', verifyToken, addVideo) // add video route to access the add video function
router.put('/:id', verifyToken, updateVideo) // update video route to access the add video function
router.delete('/:id', verifyToken, deleteVideo) // delete video route to access the delete video function
router.get('/find/:id', getVideo) // get video by id route to access the get video by id function
router.put('/views/:id', verifyToken, addView) // like video route to access the like video function
router.put('/sub/:id', verifyToken, sub) // sub viedo route to access the sub video function 
router.put('/like/:id', verifyToken, likeVideo) // like video route to access the like video function
router.put('/unlike/:id', verifyToken, unLikeVideo) // unlike video route to access the unlike video function
router.get('/trend', trends) // trending video route to access the trending video function
router.get('/random', random) // random video route to access the random video function

export default router
