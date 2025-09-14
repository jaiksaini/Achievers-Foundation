import s3 from "../config/s3.js";
import Document from "../models/documentModel.js";
import { v4 as uuidv4 } from "uuid";

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

// -----------------------------------------------------
// Upload Document
// -----------------------------------------------------
export const uploadDocument = async (req, res) => {
  try {
    const { title, fileName } = req.body;

    // Generate unique key for file
    const key = `documents/${uuidv4()}-${fileName}`;

    // Get a signed URL from S3
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      ContentType: "application/pdf",
      Expires: 60, // 1 min
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

    // Save metadata in DB
    const document = await Document.create({
      title,
      fileUrl: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`,
      key,
    });

    res
      .status(201)
      .json({
        status: "success",
        message: "File Uploaded Successfully",
        uploadUrl,
        document,
      });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

// -----------------------------------------------------
// List Documents
// -----------------------------------------------------
export const listDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadedAt: -1 });
    res.status(200).json({
      status: "success",
      message: "Documents fetched successfully",
      documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ status: "failed", message: "Failed to fetch documents" });
  }
};


// -----------------------------------------------------
// Delete Document
// -----------------------------------------------------
export const deleteDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const document = await Document.findById(id);
  
      if (!document) return res.status(404).json({ error: "Document not found" });
  
      // Delete from S3
      await s3
        .deleteObject({
          Bucket: AWS_BUCKET_NAME,
          Key: document.key,
        })
        .promise();
  
      // Delete from DB
      await document.deleteOne();
  
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete document" });
    }
  };