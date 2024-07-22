const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "User already exists"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    image: String,
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Please provide one of the required roles",
      },
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Confirm password and password do not match",
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    watchList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "favorites",
    select: "title coverImage",
  });
  next();
});

userSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "watchList",
    select: "title coverImage",
  });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure token is created after password change
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// add watchList
userSchema.methods.addContent = function (contentId) {
  if (!this.watchList.includes(contentId)) {
    this.watchList.push(contentId);
  }
  return this.save({ validateBeforeSave: false });
};

// remove watchList
userSchema.methods.removeContent = function (contentId) {
  this.watchList = this.watchList.filter(
    (content) => content.id.toString() !== contentId.toString()
  );

  return this.save({ validateBeforeSave: false });
};

// favourite methods
// add favorite
userSchema.methods.addFavorite = function (contentId) {
  if (!this.favorites.includes(contentId)) {
    this.favorites.push(contentId);
  }

  return this.save({ validateBeforeSave: false });
};

// remove favorite
userSchema.methods.deleteFavorite = function (contentId) {
  this.favorites = this.favorites.filter(
    (content) => content.id.toString() !== contentId.toString()
  );

  return this.save({ validateBeforeSave: false });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
