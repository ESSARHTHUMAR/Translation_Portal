
//Custom error handle function.
// We can use it for showing our Custom error message like 
// Password length is too short, email is invalid, etc.

const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.message = message;
    error.statusCode = statusCode;
    return error;
}