import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true
    },
    jobLocation:{
        type:String,
        enum:['onsite','remotely','hybrid'],
        required:true
    },
    workingTime:{
        type:String,
        enum:['part-time','full-time'],
        required:true
    },
    seniorityLevel:{
        type:String,
        enum:['junior','mid-level','senior-level','team lead','CTO'],
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    technicalSkills:{
        type: [String],
        required:true
    },
    softSkills:{
        type: [String],
        required:true
    },
    addedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:'company',
        required:true
    }
},{timestamps:true})

export const jobModel = mongoose.model('job',schema)