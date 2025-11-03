import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // 🧠 Step 1: Basic validation
  if ([fullName, username, email, password].some((field) => field?.trim()==="")) {
    throw new ApiError(400, "All fields are required");
  }

  // 🧠 Step 2: Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // 🧠 Step 3: Check multer file uploads
  console.log("REQ FILES:", req.files);
  console.log("REQ BODY:", req.body);

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // 🧠 Step 4: Upload to Cloudinary
  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // let coverImage = "";
  // if (coverImageLocalPath) {
  //   coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // }

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Uploaded avatar:", avatar);
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw new ApiError(500, "Failed to upload avatar");
  }
  
  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("Uploaded coverImage:", coverImage);
  } catch (error) {
    console.error("Error uploading coverImage:", error);
    throw new ApiError(500, "Failed to upload coverImage");
  }

  // 🧠 Step 5: Create user
  try {
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }
  
    // ✅ Step 7: Send response
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("User creation failed:", error);
    
    if(avatar){
      await deleteFromCloudinary(avatar.public_id);
    }

    if(coverImage){
      await deleteFromCloudinary(coverImage.public_id);
    }

    throw new ApiError(500, "User creation failed and images were deleted");
  }
});

export { registerUser };
