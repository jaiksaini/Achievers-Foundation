import express from "express";
const router = express.Router();

import {
  createDonation,
  verifyDonation,
  getAllDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getUserDonations,
  getDonationStats,
} from "../controllers/donationController.js";

import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

// ------------------------------------------------
// Donor Routes.. 
// ------------------------------------------------
router.post("/create", accessTokenAutoRefresh, createDonation);           
router.post("/verify",accessTokenAutoRefresh, verifyDonation);          
router.get("/user/:userId",accessTokenAutoRefresh, getUserDonations);    

// ------------------------------------------------
// Admin Routes.. 
// ------------------------------------------------
router.get(
  "/all",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getAllDonations
);

router.get(
  "/stats",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getDonationStats
);

router.get(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getDonationById
);

router.put(
  "/:id/status",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  updateDonationStatus
);

router.delete(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteDonation
);

export default router;
