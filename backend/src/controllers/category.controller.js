import  prisma  from "../config/prisma.js";

// ---------- CATEGORIES ----------

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { projects: true },
    });
    res.status(200).json({ status: "success", categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to fetch categories" });
  }
};

// Add new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ status: "failed", message: "Name required" });

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json({ status: "success", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to add category" });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Set projects' categoryId to null if category deleted
    await prisma.project.updateMany({
      where: { categoryId: parseInt(id) },
      data: { categoryId: null },
    });

    await prisma.category.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ status: "success", message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to delete category" });
  }
};
