import mongoose from "mongoose"

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a community name"],
      trim: true,
      maxlength: [100, "Community name cannot be more than 100 characters"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a community description"],
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Design", "Development", "Business", "Technology", "Marketing", "Product", "Data", "Other"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    guidelines: {
      type: String,
      trim: true,
      maxlength: [2000, "Guidelines cannot be more than 2000 characters"],
    },
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

// Add virtual field for member count
CommunitySchema.virtual("memberCount").get(function () {
  return this.members.length
})

export default mongoose.models.Community || mongoose.model("Community", CommunitySchema)

