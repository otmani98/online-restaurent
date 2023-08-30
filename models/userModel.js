const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [
      {
        validator: function (value) {
          if (value) {
            return validator.isEmail(value);
          }
        },
        message: 'please provide a valid email',
      },
    ],
  },
  role: {
    type: String,
    enum: ['admin', 'moderator'],
    default: 'moderator',
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      //it works only with create and save not update
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    sparse: true,
    partialIndexExpression: { email: { $exists: true } },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

//only run this if password changed for some user is already exist not new
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.passwordCorrect = async function (
  candidatePassword,
  adminPassword,
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

userSchema.methods.changedPasswordAfter = function (JwtTimesStamp) {
  if (this.passwordChangedAt) {
    const changedStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JwtTimesStamp < changedStamp;
  }
  //didn't change
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
