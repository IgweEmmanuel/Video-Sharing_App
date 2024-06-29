// import packages to structure our mongoose database structure or  schema
import mongoose from 'mongoose'

/*Here, we define the video model schema that will structure what 
fields it will contain*/
const VideoSchema = new mongoose.Schema(
  {
    user_id: {
      // the name field for the user
      type: String,
      required: true,
    },
    title: {
      // title field of the video
      type: String,
      required: true,
    },
    desc: {
      // description field for the video
      type: String,
      required: true,
    },
    imgUrl: {
      // the image thumbnail url field to store for the video image uploaded online e.g google
      type: String,
      required: true,
    },
    videoUrl: {
      // the video url field to store video url
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      types: [String],
      default: [],
    },
  },
  { timestamps: true } /*updates teh time of creation of this user*/
)

export default mongoose.model('Video', VideoSchema)
