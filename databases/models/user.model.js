import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      recoveryEmail: {
        type: String,
      },
      DOB: {
        type: String,
      },
      mobileNumber: {
        type: String,
        unique: true,
      },
      role: {
        type: String,
        enum: ['user', 'company_HR'],
        default:'user'
      },
      status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
      },
      resetToken:Number,
      resetTokenExpires:Number,
      passwordChangedAt:Date,
},{timestamps:true})

export const userModel = mongoose.model('user',schema)