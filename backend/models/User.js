const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { createCustomError } = require("../errors/custom-error");

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  refreshToken: {
    type: Schema.Types.ObjectId,
    ref: "RefreshToken",
  },
  email: {
    type: String,
    required: [true, "이메일은 필수 항목입니다."],
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "이메일 형식에 맞게 입력해주십시오.",
    ],
  },
  nickname: {
    type: String,
    required: [true, "닉네임은 필수 항목입니다."],
    unique: true,
    minlength: [2, "닉네임은 2자리 이상이어야 합니다."],
    maxlength: [20, "닉네임은 20자리를 넘을 수 없습니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호는 필수 항목 입니다."],
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
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// static method to login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw createCustomError("잘못된 비밀번호입니다.", 401);
  }
  throw createCustomError("잘못된 이메일입니다.", 401);
};

UserSchema.statics.isValidId = function (id) {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw createCustomError("해당 사용자 아이디는 유효하지 않습니다.", 401);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
