import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    // get user details from forntend
    // Validation - not empty
    // Check if user alredy exits : username, email
    // Checks for images , checks for avatar
    // upload them to cloudinary , check avatar is uploaeded or not ?
    // create User object - create entry in db
    // remove password and refresh token feild from response
    // check for user creation
    // return response

    const {fullName, email,userName, password} = req.body
    console.log("email : ",email);

    if (
        [fullName,userName,email,password].some( (feild) => 
        feild?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = User.findOne({
        $or: [{ username },{ password }]
    })
    
    if(existedUser){
        throw new ApiError(409,"User with email or username is already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required !");


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)    
    
    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while regitering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})


export {registerUser};