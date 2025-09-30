import prisma from "../config/prisma.js"

// ---------- PROJECTS ----------

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to fetch projects" });
  }
};

// Add new project
export const uploadProject = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "failed", message: "Project image is required" });
    }

    const { name, description, link, categoryId } = req.body;

    // Validate fields
    if (!name || !description || !link || !categoryId) {
      return res.status(400).json({
        status: "failed",
        message: "Name, Description, Link, and Category are required",
      });
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        description,
        link,
        image: `/uploads/projects/${req.file.filename}`, // store path to image
        categoryId: parseInt(categoryId),
      },
    });

    res.status(201).json({
      status: "success",
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to add project",
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ status: "success", message: "Project deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to delete project" });
  }
};
