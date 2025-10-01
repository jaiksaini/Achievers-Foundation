import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProjectAndCategoryStore = create((set, get) => ({
  projects: [],
  categories: [],
  isFetching: false,
  isUploading: false,

  // Fetch all projects
  getProjects: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get("/api/projects");
      set({ projects: res.data.projects || [], isFetching: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
      set({ isFetching: false });
    }
  },

  // Add new project
  addProject: async (data) => {
    set({ isUploading: true });
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("link", data.link);
      formData.append("categoryId", data.categoryId); // ✅ use categoryId
      formData.append("image", data.image);

      const res = await axiosInstance.post("/api/projects/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set({ projects: [...get().projects, res.data.project] });
      toast.success("Project added successfully");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    } finally {
      set({ isUploading: false });
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      await axiosInstance.delete(`/api/projects/${id}`);
      set({ projects: get().projects.filter((p) => p.id !== id) });
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  },

  // Fetch categories
  getCategories: async () => {
    try {
      const res = await axiosInstance.get("/api/category");
      set({ categories: res.data.categories || [] }); // ✅ categories are objects
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  },

  // Add category
  addCategory: async (category) => {
    try {
      const res = await axiosInstance.post("/api/category", { name: category });
      set({ categories: [...get().categories, res.data.category] }); // ✅ store full object
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    try {
      await axiosInstance.delete(`/api/category/${id}`);
      set({
        categories: get().categories.filter((c) => c.id !== id),
        projects: get().projects.map((p) =>
          p.categoryId === id ? { ...p, categoryId: null } : p
        ),
      });
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  },
}));
