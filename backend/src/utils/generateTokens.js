// import jwt from "jsonwebtoken";
// import UserRefreshTokenModel from "../models/UserRefreshToken.js"


// const generateTokens = async(user) =>{
//     try {
//         if(!user){
//             throw new Error("User Not found in file generateTokens")
//         }
//         const payload = {_id: user._id, roles: user.roles};

//         const accessToken  = jwt.sign(
//             payload,
//             process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
//             {
//                 expiresIn:"1d"  // expires in 1 minute
//             }
//         )

//         const refreshToken = jwt.sign(
//             payload,
//             process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
//             {
//                 expiresIn:"5d" // expires in 5 days
//             }
//         )

//         await UserRefreshTokenModel.deleteMany({ userId: user._id });

//         await new UserRefreshTokenModel({
//             userId:user._id,
//             token: refreshToken,
//         }).save();

//         return{
//             accessToken,
//             refreshToken,
//             accessTokenExp : Math.floor(Date.now() /1000) +1* 60, // 1 minute
//             refreshTokenExp : Math.floor(Date.now()/1000) + 60*60*24*5 // 5 Days
//         }
//     } catch (error) {
//         console.error("Error in generating Tokens in file generateTokens", error.message);
//         return Promise.reject(error)
//     }
// };


// export default generateTokens;










import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js"; 

const generateTokens = async (user) => {
  try {
    if (!user) {
      throw new Error("User not found in generateTokens");
    }

    
    const payload = { id: user.id, role: user.role };

    // Generate access token (1 day validity)
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Generate refresh token (5 days validity)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "5d",
    });

    // Delete old refresh tokens for this user
    await prisma.userRefreshToken.deleteMany({
      where: { userId: user.id },
    });

    // Store new refresh token in DB
    await prisma.userRefreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      },
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
      refreshTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5, // 5 days
    };
  } catch (error) {
    console.error("Error in generating tokens:", error.message);
    throw error;
  }
};

export default generateTokens;
