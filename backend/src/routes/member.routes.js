import express from "express";
const router = express.Router();

import {
  applyForMembership,
  approveMember,
  rejectMember,
  getAllMembers,
  getApprovedMembers,
  getPendingMembers,
} from "../controllers/member.controller.js";

import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

// ---------------------------------------
// Public Routes
// ---------------------------------------
router.post("/apply", applyForMembership);
router.get("/approved", getApprovedMembers);

// ---------------------------------------
// Protected Routes (Admin Only)
// ---------------------------------------
router.get(
  "/all",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getAllMembers
);

router.get(
  "/pending",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getPendingMembers
);

router.put(
  "/approve/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  approveMember
);

router.put(
  "/reject/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  rejectMember
);

export default router;
