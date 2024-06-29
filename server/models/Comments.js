// import packages to structure our mongoose database structure or  schema
import mongoose from 'mongoose'

/*Here, we define the user model schema that will structure what 
fields will be in the user*/
const CommentSchema = new mongoose.Schema(
  {
    user_id: {
      // the user id field for the comment
      type: String,
      required: true,
    },
    video_id: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } /*updates teh time of creation of this user*/
)

export default mongoose.model('Comment', CommentSchema)
