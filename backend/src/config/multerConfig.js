import multer from "multer";
import path from "path";
import fs from "fs";

// Helper: ensure folder exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// ------------------ Profile Pic Upload ------------------
const profilePicPath = "src/uploads/profile_pics";
ensureDir(profilePicPath);

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profilePicPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

export const uploadProfilePic = multer({ storage: profileStorage });

// ------------------ Document Upload ------------------
const documentPath = "src/uploads/documents";
ensureDir(documentPath);

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, documentPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

export const uploadDocument = multer({ storage: documentStorage });


// ------------------ Project Image Upload ------------------
const projectImagePath = "src/uploads/projects";
ensureDir(projectImagePath);

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, projectImagePath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // e.g., 1696112345678.jpg
});

export const uploadProjectImage = multer({ storage: projectStorage });
