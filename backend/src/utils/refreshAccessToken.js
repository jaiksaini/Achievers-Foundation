// import User from "../models/userModel.js"
// import UserRefreshTokenModel from "../models/UserRefreshToken.js"
// import generateTokens from "./generateTokens.js"
// import verifyRefreshToken from "./verifyRefreshToken.js"

// const refreshAccessToken = async (req, res) =>{
//     try {
//         const oldRefreshToken = req.cookies.refreshToken;
//         if(!oldRefreshToken){
//             throw new Error("no Refresh Token Provided in file refreshAccessToken");
//         }

//         const {tokenDetails , error} = await verifyRefreshToken(oldRefreshToken);

//         if(error){
//             throw new Error("Invalid Refrsh Token");
//         }

//         const user = await User.findById(tokenDetails._id);
//         if(!user){
//             throw new Error("User not Found in file refreshAccessToken");
//         }

//         const userRefreshToken = await UserRefreshTokenModel.findOne({
//             userId: tokenDetails._id,
//         });

//         if(oldRefreshToken !== userRefreshToken.token || userRefreshToken.blacklisted){
//             throw new Error("Unauthorized Access  in file refreshAccessToken")
//         }

//         // Generate new Tokens

//         const {accessToken , refreshToken , accessTokenExp  , refreshTokenExp} = await generateTokens(user)

//         return {
//             newAccessToken : accessToken,
//             newRefreshToken : refreshToken,
//             newAccessTokenExp : accessTokenExp,
//             newRefreshTokenExp : refreshTokenExp
//         };
//     } catch (error) {
//         console.error("Error in RefreshAccessToken: in file refreshAccessToken", error.message);

//         throw new Error(error.message);
//     }
// }

// export default refreshAccessToken;

import prisma from "../config/prisma.js";
import generateTokens from "./generateTokens.js";
import verifyRefreshToken from "./verifyRefreshToken.js";

const refreshAccessToken = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      throw new Error("No refresh token provided in refreshAccessToken");
    }

    // Verify refresh token
    const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

    if (error) {
      throw new Error("Invalid refresh token");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: tokenDetails.id },
    });
    if (!user) {
      throw new Error("User not found in refreshAccessToken");
    }

    // Find refresh token in DB
    const userRefreshToken = await prisma.userRefreshToken.findFirst({
      where: {
        userId: tokenDetails.id,
      },
    });

    if (
      !userRefreshToken ||
      oldRefreshToken !== userRefreshToken.token ||
      userRefreshToken.blacklisted
    ) {
      throw new Error("Unauthorized access in refreshAccessToken");
    }

    // Generate new tokens
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(user);

    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (error) {
    console.error("Error in refreshAccessToken:", error.message || error);
    throw new Error(error.message || "Failed to refresh access token");
  }
};

export default refreshAccessToken;