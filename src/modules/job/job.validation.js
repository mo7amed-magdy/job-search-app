import Joi from "joi"




const addJobSchemaVal = Joi.object({
        jobTitle:Joi.string().required().max(60).min(2),
        jobLocation:Joi.string().required(),
        workingTime:Joi.string().required(),
        seniorityLevel:Joi.string().required(),
        jobDescription:Joi.string().required(),
        technicalSkills:Joi.array().items(Joi.string().max(20)),
        softSkills:Joi.array().items(Joi.string().max(20)),
        addedBy:Joi.string().hex().length(24),
        company:Joi.string().hex().length(24).required()
})
const addApplicationSchemaVal = Joi.object({
        userTechSkills:Joi.array().items(Joi.string().max(20)),
        userSoftSkills:Joi.array().items(Joi.string().max(20)),
        jobId:Joi.string().hex().length(24),
        userId:Joi.string().hex().length(24),
        companyId:Joi.string().hex().length(24)
})


const updateSchemaVal = Joi.object({
    jobTitle:Joi.string().max(60).min(2),
    jobLocation:Joi.string(),
    workingTime:Joi.string(),
    seniorityLevel:Joi.string(),
    jobDescription:Joi.string(),
    technicalSkills:Joi.array().items(Joi.string().max(20)),
    softSkills:Joi.array().items(Joi.string().max(20)),
    jobId:Joi.string().hex().length(24)
})
const deleteSchemaVal = Joi.object({
    jobId:Joi.string().hex().length(24)
})


export {
    addJobSchemaVal,
    updateSchemaVal,
    deleteSchemaVal,
    addApplicationSchemaVal

}