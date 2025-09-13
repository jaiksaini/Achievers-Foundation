import {
  uploadDocument,
  listDocuments,
  deleteDocument,
} from "../controllers/document.controller.js";
import passport from "passport";
import express from "express";
const router = express.Router();
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

router.post(
  "/documents",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  uploadDocument
);
router.get(
  "/documents",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  listDocuments
);
router.delete(
  "/documents/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteDocument
);

export default router;
