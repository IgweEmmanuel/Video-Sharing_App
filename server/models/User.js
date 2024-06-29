// import packages to structure our mongoose database structure or  schema
import mongoose from 'mongoose'

/*Here, we define the user model schema that will structure what 
fields will be in the user*/
const UserSchema = new mongoose.Schema(
  {
    name: {
      // the name field for the user
      type: String,
      required: true,
      unique: true,
    },
    email: {
      // the email field for the user
      type: String,
      required: true,
      unique: true,
    },
    password: {
      // the password field for the user
      type: String,
      required: true,
    },
    img: {
      // the image field for the user
      type: String,
    },
    subscribers: {
      // the subscriber count set to default 0
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      // the subscribed users we should videos that belong to our subscribed users using their id
      type: [String], // this holds the subscribers' user id in array format
    },
  },
  { timestamps: true } /*updates teh time of creation of this user*/
)

export default mongoose.model('User', UserSchema)
