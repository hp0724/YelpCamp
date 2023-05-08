const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

//https://res.cloudinary.com/dvyvphh3u/image/upload/v1683522853/YelpCamp/ofvkv5ajw7tykfcjrnzl.jpg
const imageSchema = new Schema({
  url: String,
  filename: String,
});
imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/h_200,w_200");
});
const CampgroundSchema = new Schema({
  title: String,
  images: [imageSchema],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
//게시물 삭제시 해당 리뷰까지 다 지우기
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
