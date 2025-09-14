import express from "express";
const router = express.Router();

import {
  applyForMembership,
  approveMember,
  rejectMember,
  getAllMembers,
  getApprovedMembers,
  getPendingMembers,
  deleteMember
} from "../controllers/member.controller.js";

import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

// ---------------------------------------
// Public Routes
// ---------------------------------------
router.post("/apply", applyForMembership);
router.get("/approved-members", getApprovedMembers);

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
  "/pending-request",
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

router.delete(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteMember
);

export default router;
