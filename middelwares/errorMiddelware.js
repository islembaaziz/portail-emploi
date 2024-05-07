//error middelware || NEXT function
const erroMiddelware = (err, req, res, next) => {
  console.log(err);
  const defaultErrors = {
    statusCode : 500,
    message: err,
  }
 // missing filed error
 if(err.name === 'ValidationError') {
    defaultErrors.statusCode = 400
    defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
 }
 res.status(defaultErrors.statusCode).json({message: defaultErrors.message});
};


export default erroMiddelware;