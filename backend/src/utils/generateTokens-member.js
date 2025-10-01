import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const generateTokensMember = async (user) => {
  try {
    if (!user) throw new Error("User Not found in file generateTokens (memberFile)");

    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "5d",
    });

    // Clear old tokens
    await prisma.memberRefreshToken.deleteMany({
      where: { memberId: user.id },
    });

    // Save new refresh token
    await prisma.memberRefreshToken.create({
      data: {
        memberId: user.id,
        token: refreshToken,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      },
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      refreshTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5,
    };
  } catch (error) {
    console.error("Error in generating Tokens (memberFile): ", error.message);
    throw error;
  }
};

export default generateTokensMember;
