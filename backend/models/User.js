const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  role: { type: String, required: true },
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.password;
  },
});

// fire a function berfore doc saved to db
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  console.log(this);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("잘못된 비밀번호 입니다.");
  }
  throw Error("잘못된 이메일입니다.");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
