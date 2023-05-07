const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

// 배열 무작위 값 얻기
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  //초기화 뒤에 캠핑장 이름을 얻는다
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50) + 10;
    const camp = new Campground({
      author: "64560c300a06f1fb31791a1c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/4803919/camping",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex mollitia quaerat, quidem sunt molestiae quas. Quia eius hic dolor voluptas eos a nam cupiditate consectetur, laborum ab suscipit ut corporis.",
      price: price,
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
