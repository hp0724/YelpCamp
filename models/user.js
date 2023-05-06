const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//사용자 이름과 필드 추가
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
