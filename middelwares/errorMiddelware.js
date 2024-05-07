//error middelware || NEXT function
const erroMiddelware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode : 500,
    message: 'Somthing went wrong'
  }
 // missing filed error
 if(err.name === 'ValidationError') 
};


export default erroMiddelware;