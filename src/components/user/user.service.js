
const UserModel = require("./user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.signUp = catchAsyncError(async (req, res, next) => {
  req.body.prfileImage = req.file?.filename;
  let User = new UserModel(req.body);
  let isUser = await UserModel.findOne({ phone: req.body.phone });
  if (isUser) return next(new AppError("User Already Exist", 401));
  let token = jwt.sign(
    { name: User.name, userId: User._id },
    process.env.JWT_KEY
  );
  await User.save();
  res.status(200).json({message:'success' , token});
});

exports.getUsers = catchAsyncError(async (req, res) => {
  let Users = await UserModel.find({});
  res.status(200).json(Users);
});
