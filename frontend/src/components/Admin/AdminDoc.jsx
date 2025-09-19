import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaSearch, FaFileAlt } from "react-icons/fa";
import { useDocumentStore } from "../../store/useDocumentStore";

const AdminDoc = () => {
  const { documents, isFetching, getAllDocuments, deleteDocument } =
    useDocumentStore();
  const [search, setSearch] = useState("");

  // Fetch documents on mount
  useEffect(() => {
    getAllDocuments();
  }, [getAllDocuments]);

  // Filter by search
  const filteredDocs = documents.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      await deleteDocument(id);
    }
  };

  return (
    <div className="md:p-2 min-h-[78vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Documents</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 pl-10 rounded w-full"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Add Document (future feature) */}
          <button
            onClick={() => alert("Add Document functionality coming soon")}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-700 flex items-center gap-2"
          >
            <FaPlus /> Add Document
          </button>
        </div>
      </div>

      {/* Loader */}
      {isFetching ? (
        <p className="text-center text-gray-500">Loading documents...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Document</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Size</th>
                  <th className="p-3 border">Uploaded At</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 border">
                    <td className="p-3 flex items-center gap-3">
                      <FaFileAlt className="text-blue-500 text-xl" />
                      {doc.name}
                    </td>
                    <td className="p-3 border">{doc.type || "N/A"}</td>
                    <td className="p-3 border">{doc.size || "-"}</td>
                    <td className="p-3 border">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded shadow p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-blue-500 text-2xl" />
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{doc.size || "-"}</span>
                  <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
            {filteredDocs.length === 0 && (
              <p className="text-center text-gray-500">No documents found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDoc;
