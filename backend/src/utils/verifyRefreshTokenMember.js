import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const verifyRefreshTokenMember = async (refreshToken) => {
  try {
    const privateKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

    const memberRefreshToken = await prisma.memberRefreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!memberRefreshToken) {
      throw new Error("Refresh token not found in DB");
    }

    const tokenDetails = jwt.verify(refreshToken, privateKey);

    return {
      tokenDetails,
      error: false,
      message: "Valid Refresh Token",
    };
  } catch (err) {
    console.error("verifyRefreshTokenMember error (memberFile):", err.message);
    return { error: true, message: err.message };
  }
};

export default verifyRefreshTokenMember;
