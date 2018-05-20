import mongoose from 'mongoose'
import { distanceInWordsToNow } from 'date-fns'
import slug from 'slug'
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
    slug: {
      type: String
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

RepoSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next() // skip it
    return // stop this function from running
  }
  this.slug = slug(this.name)
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx })
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`
  }
  next()
  // TODO make more resiliant so slugs are unique
})

RepoSchema.virtual('posted').get(function() {
  return distanceInWordsToNow(this.createdAt, {
    addSuffix: true
  })
})

mongoose.model('Repo', RepoSchema)
