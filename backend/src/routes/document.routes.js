import {
  uploadDocument,
  listDocuments,
  deleteDocument,
} from "../controllers/document.controller.js";
import passport from "passport";
import express from "express";
const router = express.Router();
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";


// Public Route
router.get( "/documents",  listDocuments);


router.post(
  "/documents",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  uploadDocument
);

router.delete(
  "/documents/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteDocument
);

export default router;
