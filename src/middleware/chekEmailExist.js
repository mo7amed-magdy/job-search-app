import { userModel } from "../../databases/models/user.model.js";

export const chekEmailExist = async (req, res, next) => {
  let user = await userModel.findOne({ $or: [
    { email: req.body.email },
    { mobileNumber: req.body.mobileNumber },
    { userName: req.body.userName },
  ], });
  if (user) return res.json({ message: "user already exists" });
  next();
};
