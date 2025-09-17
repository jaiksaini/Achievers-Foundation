import express from "express";
const router = express.Router();

import {
  createDonation,
  verifyDonation,
  getAllDonations,
  getDonationById,
  // updateDonationStatus,
  deleteDonation,
  getUserDonations,
  getDonationStats,
  getRecentDonations,
  downloadReceipt,
} from "../controllers/donation.controller.js";

import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

// ------------------------------------------------
// Donor Routes..
// ------------------------------------------------
router.post(
  "/create-order",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  createDonation
);
router.post(
  "/verify-payment",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  verifyDonation
);
router.get(
  "/user/:userId",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getUserDonations
);
router.get(
  "/recent-donations",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getRecentDonations
);

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

// router.put(
//   "/:id/status",
//   accessTokenAutoRefresh,
//   passport.authenticate("jwt", { session: false }),
//   updateDonationStatus
// );

router.delete(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteDonation
);

router.get(
  "/receipt/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  downloadReceipt
);

export default router;
