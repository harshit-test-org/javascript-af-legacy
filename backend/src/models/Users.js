import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  token: { type: String, required: 'Github auth token must not be null' },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Github username must not be null'
  },
  name: { type: String, trim: true, required: 'Name cannot be null' },
  photoURL: { type: String, required: true },
  bio: String
})

mongoose.model('User', UserSchema)
