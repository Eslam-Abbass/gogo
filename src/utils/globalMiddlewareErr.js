const  GlobalMiddelWareErorr=(err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
     res.status(err.statusCode).json({result:{err:err.message,statusCode:err.statusCode }});
 
 }
 module.exports= GlobalMiddelWareErorr


