const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')
const { Subscription } = require("../../helpers/constants");
const SALT_FACTOR = process.env.SALT_FACTOR;
const Schema = mongoose.Schema
const gravatar = require('gravatar');

const userSchema = new Schema({

  name:{
      type: String,
      minlength: 3,
      default: 'Guest',
    },

  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    validate(value) {
        const re = /\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
    }
  },

  password: {
    type: String,
    required: [true, 'Password required'],
  },

  avatarURL: {
      type: String,
      default: function(){
        return gravatar.url(this.email,{s:'250'}, true);
      }
    },

  subscription: {
    type: String,
    enum: {
        values: [Subscription.STARTER, Subscription.PRO, Subscription.BUZINESS],
        message: "It isn't allowed" 
    },
    default: Subscription.STARTER,
  },

  token: {
    type: String,
    default: null,
   },
 },
    {versionKey: false, timestamps: true},
    
);

userSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
            const salt = await bCrypt.genSalt(parseInt(SALT_FACTOR));
            this.password = await bCrypt.hash(this.password, salt);
        }
        next();
    });

userSchema.methods.validPassword = async function (password) {
  return await bCrypt.compareSync(String(password), this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User