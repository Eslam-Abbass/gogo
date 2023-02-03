const DriverModel =require("./driver.model")
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
//Sign Up  for Driver
exports.signup = catchAsyncError(async (req, res, next) => {
    const {password,repassword}=req.body
    if (password!==repassword){
        return next(new AppError("password not match ", 401));
    } 
    const isDriver = await DriverModel.findOne({ email: req.body.email })
    if (isDriver) return next(new AppError("Driver already exists", 401));
  
    let Driver = new DriverModel(req.body);
    await Driver.save();
    res.status(200).json(Driver);
});

//Sign in  for Driver
exports.signin = catchAsyncError(async (req, res, next) => {
    const Driver = await DriverModel.findOne({ email: req.body.email })
    if (!Driver || ! await bcrypt.compare(req.body.password, Driver.password))
        return next(new AppError("incorrect email or password", 401));

    let token = jwt.sign({ name: Driver.name, DriverId: Driver._id }, process.env.JWT_KEY);

    res.status(200).json({ token });
});