const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `The ${props.value} is not a valid phone number! You should enter something like this: 333-333-3333`,
      },
      required: [true, "Phone number is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: String,
    },
    password: {
      type: String,
      require: [true, "Set password for contact"],
    },
    token: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, 
    timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;