const { default: mongoose, model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const User_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "the name is require"],
    },
    password: {
      type: String,
      require: [true, "the password is require"],
    },
    email: {
      type: String,
      require: [true, "the email is require"],
      unique: true,
    },
 
    role: {
      type: String,
      enum: ["Admin","User"],
      require: [true,  "the role is require"],
    },
 
    RestCode: String,
    expires: Date,
    isVerified: Boolean,
    ChangePasswordAt: Date,
  },
  { timestamps: true }
);


User_Schema.pre('save', async function (next) {
  // Check if password is modified, null, or empty string
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = User_Schema;
module.exports = mongoose.model("User", User);
