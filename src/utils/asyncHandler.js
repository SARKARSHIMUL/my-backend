
// Below one is the wrapper function using Promise
const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((error) => next(error))
    }
}


export {asyncHandler}



//Below one is the wrapper function using try-catch block and on the above We can see the promise one

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
        
//     }
// }