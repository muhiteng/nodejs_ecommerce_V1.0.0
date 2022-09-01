const globalError=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.status=err.status|| "error";
    res.status(400).json({
      status:err.status,
      error:err,
      message:err.message ,
      stack:err.stack // when error happened  
    });
  };

  module.exports=globalError;