import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userResume :{
        type:String,
    },
    userSoftSkills :{
        type: [String],
        required:true
    },
    userTechSkills:{
        type: [String],
        required:true
    },
    jobId:{
        type:mongoose.Schema.ObjectId,
        ref:'job',
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:'company',
        required:true
    }
},{timestamps:true})

export const applicationModel = mongoose.model('aplication',schema)