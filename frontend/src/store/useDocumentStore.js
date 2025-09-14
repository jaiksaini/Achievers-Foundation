import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useDocumentStore = create((set) => ({
  documents: [],
  isFetching: false,

  getAllDocuments: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get("/api/document/documents");
      set({ documents: res.data.documents, isFetching: false });
    } catch (error) {
      console.error("Error Fetching Documents", error);
      toast.error("Failed to fetch documents");
      set({ isFetching: false });
    }
  },

   // Delete a document
   deleteDocument: async (id) => {
    try {
      await axiosInstance.delete(`/api/document/documents/${id}`);
      set({ documents: get().documents.filter((doc) => doc._id !== id) });
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  },
}));
