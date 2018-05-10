import mongoose from 'mongoose'
import { distanceInWordsToNow } from 'date-fns'
const Schema = mongoose.Schema

const RepoSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name must be provided'
    },
    nameWithOwner: {
      type: String,
      required: 'Name with owner is not available',
      unique: true
    },
    url: {
      type: String,
      required: 'Repository url must not be null',
      unique: true
    },
    description: {
      type: String,
      required: 'Description of repo cant be null'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Repository should have an owner'
    },
    eChoice: Boolean
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

RepoSchema.pre('find', function() {
  this.populate('owner')
})

RepoSchema.virtual('posted').get(function() {
  return distanceInWordsToNow(this.createdAt, {
    addSuffix: true
  })
})

mongoose.model('Repo', RepoSchema)
