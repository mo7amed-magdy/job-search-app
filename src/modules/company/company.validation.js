import Joi from "joi"




const addCompanySchemaVal = Joi.object({
        companyName:Joi.string().required().max(60).min(2),
        description:Joi.string().max(600),
        industry:Joi.string(),
        address:Joi.string().required(),
        numberOfEmployees:Joi.number().required(),
        companyEmail:Joi.string().email().required(),
        companyHR:Joi.string().hex().length(24)

})


const signinSchemaVal = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    mobileNumber: Joi.string().pattern(/^01[0-25]\d{8}$/),
})
const updateSchemaVal = Joi.object({
        companyName:Joi.string().max(60).min(2),
        description:Joi.string().max(600),
        industry:Joi.string(),
        address:Joi.string(),
        numberOfEmployees:Joi.number(),
        companyEmail:Joi.string().email(),
        compId:Joi.string().hex().length(24)
})
const deleteSchemaVal = Joi.object({
    compId:Joi.string().hex().length(24)
})
const searchSchemaVal = Joi.object({
    companyName:Joi.string().max(60).min(2)
})
const updatePassSchemaVal = Joi.object({
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    newPassword: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    id:Joi.string()

})

export {
    addCompanySchemaVal,
    signinSchemaVal,
    updateSchemaVal,
    deleteSchemaVal,
    searchSchemaVal,
    updatePassSchemaVal
}