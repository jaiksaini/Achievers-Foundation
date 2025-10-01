import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js"; 

const verifyRefreshToken = async (refreshToken) => {
  try {
    const privateKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

    // Check if refresh token exists in DB
    const storedToken = await prisma.userRefreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      throw {
        error: true,
        message: "Invalid refresh token (not found in DB)",
      };
    }

    // Verify JWT token
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error) {
    throw {
      error: true,
      message: "Invalid refresh token in verifyRefreshToken",
    };
  }
};

export default verifyRefreshToken;
