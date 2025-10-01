import prisma from "../config/prisma.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
};

// ---------------------------
// User JWT Strategy
// ---------------------------
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id }, // Prisma uses 'id'
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          profilePic: true,
          is_verified: true,
        },
      });

      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// ---------------------------
// Member JWT Strategy
// ---------------------------
passport.use(
  "member-jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const member = await prisma.member.findUnique({
        where: { id: jwt_payload.id }, // Prisma uses 'id'
        select: {
          id: true,
          name: true,
          email: true,
          // role: true,
          profilePic: true,
        },
      });

      if (member) return done(null, member);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

