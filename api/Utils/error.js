const errorHandler=(statuscode,message)=>{
    const error=new Error();
    error.statusCode=statuscode;
    error.message=message;
    return error;
};

export default errorHandler;

//creating a custom error like "the password is incorrect"