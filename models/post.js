import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Please provide post content"],
      trim: true,
      maxlength: [5000, "Post content cannot be more than 5000 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    shares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Add virtual fields for counts
PostSchema.virtual("likesCount").get(function () {
  return this.likes.length
})

PostSchema.virtual("commentsCount").get(function () {
  return this.comments.length
})

PostSchema.virtual("sharesCount").get(function () {
  return this.shares.length
})

export default mongoose.models.Post || mongoose.model("Post", PostSchema)

