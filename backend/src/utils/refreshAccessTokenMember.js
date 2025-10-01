import prisma from "../config/prisma.js";
import generateTokensMember from "./generateTokens-member.js";
import verifyRefreshTokenMember from "./verifyRefreshTokenMember.js";

const refreshAccessTokenMember = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) throw new Error("No Refresh Token Provided");

    const { tokenDetails, error, message } = await verifyRefreshTokenMember(oldRefreshToken);
    if (error) throw new Error(message);

    const user = await prisma.member.findUnique({
      where: { id: tokenDetails.id },
    });
    if (!user) throw new Error("User not Found");

    const userRefreshToken = await prisma.memberRefreshToken.findFirst({
      where: {
        memberId: tokenDetails.id,
        token: oldRefreshToken,
        blacklisted: false,
      },
    });

    if (!userRefreshToken) {
      throw new Error("Unauthorized Access (memberFile)");
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokensMember(user);

    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (error) {
    console.error("Error in RefreshAccessToken (memberFile):", error.message);
    throw error;
  }
};

export default refreshAccessTokenMember;
