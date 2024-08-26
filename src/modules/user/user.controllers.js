import { userModel } from "../../../databases/models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


const signup = catchError(async (req, res, next) => {
        await userModel.insertMany(req.body)
        let token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN)
        res.json({ message: "success",token })

})

const signin = catchError(async (req, res,next) => {
    let user = await userModel.findOne({$or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ _id: user._id, email: user.email,role:user.role }, process.env.JWT_TOKEN,{ expiresIn: '1h' })
        user.status = 'online';
        await user.save();
        return res.json({ message: "success", token })
    }

    return next(new AppError("incorrect email or password",401))
})

const updateUser = catchError(async (req,res,next) =>{
    if (req.user._id !== req.params.id) {
        return next(new AppError("You are not the owner of this account",401))
      }
      const conflictingUser = await userModel.findOne({
        $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }]
      });
      if (conflictingUser) {
        return next(new AppError("Conflict: Email or mobile number already in use",409))
      }
       await userModel.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            recoveryEmail: req.body.recoveryEmail,
            DOB: req.body.DOB,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
          },
        },
        { new: true }
      );
      res.json({ message: 'Account updated successfully' });
})

const deleteUser = catchError(async (req,res,next) => {
    if (req.user._id !== req.params.id) {
        return next(new AppError("You are not the owner of this account",401))
      }
      await userModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Account deleted successfully' });
})
const getUserData = catchError(async (req,res,next) =>{
    if (req.user._id !== req.params.id) {
        return next(new AppError("You are not the owner of this account",401))
      }
      const user = await userModel.findById(req.params.id);
      if(!user) return next(new AppError("user not found"))
      res.json({message:'success',user})
})
const getProfileData = catchError(async (req,res,next) =>{
      const user = await userModel.findById(req.params.id);
      if(!user) return next(new AppError("user not found"))
      res.json({message:'success',user})
})
const updatePassword = catchError(async (req,res,next) =>{
    if (req.user._id !== req.params.id) {
        return next(new AppError("You are not the owner of this account",401))
      }
    let user = await userModel.findById(req.params.id)
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let newPassword = bcrypt.hashSync(req.body.newPassword,8)
        user.password = newPassword;
        user.passwordChangedAt = Date.now();
        await user.save();
        return res.json({ message: "success" })
    }
    return next(new AppError("incorrect password",401))

})

const forgetPassword = catchError(async (req,res,next) => {
    const { email } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.json({ message: 'User not found' });
      }
  
      const resetToken = generateOTP();
  
      user.resetToken = resetToken;
      user.resetTokenExpires = Date.now() + 3600000;
      await user.save();
  
      res.status(200).json({ resetToken });
})

const resetPassword = catchError( async (req,res,next) =>{
    const { resetToken, newPassword } = req.body;
  
      const user = await userModel.findOne({
        _id:req.user._id,
        resetToken,
        resetTokenExpires: { $gt: Date.now() },
      });
      if (!user) {
        return next(new AppError("Invalid or expired reset OTP"))
      }
  

      const hashedPassword = bcrypt.hashSync(newPassword, 8);
      user.passwordChangedAt = Date.now();
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successfully' });
})

const getSameRecovery = catchError(async (req,res,next) =>{
    let users = await userModel.find({recoveryEmail:req.body.recoveryEmail})
    if (!users) {
      return next(new AppError("no users found"))
    }
    res.json({message:"success",users})
})

export {
    signup,
    signin,
    updateUser,
    deleteUser,
    getUserData,
    getProfileData,
    updatePassword,
    forgetPassword,
    resetPassword,
    getSameRecovery
}