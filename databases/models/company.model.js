import mongoose from "mongoose";

const schema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      industry: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      numberOfEmployees: {
        type:Number,
        validate:{
            validator:(value)=>{
                return value>=11&&value<=20
            }
        },
        required:true
      },
      companyEmail: {
        type: String,
        unique: true,
        required: true,
      },
      companyHR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
},{timestamps:true})

export const companyModel = mongoose.model('company',schema)