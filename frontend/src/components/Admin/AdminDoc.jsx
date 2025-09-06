import React, { useState } from "react";
import { FaTrash, FaPlus, FaSearch, FaFileAlt } from "react-icons/fa";

const AdminDoc = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Annual Report 2024.pdf",
      type: "PDF",
      size: "2.3 MB",
      date: "2024-12-20",
    },
    {
      id: 2,
      name: "Volunteer Guidelines.docx",
      type: "Word",
      size: "1.2 MB",
      date: "2025-01-05",
    },
    {
      id: 3,
      name: "Donation Policy.pdf",
      type: "PDF",
      size: "800 KB",
      date: "2025-02-10",
    },
    {
      id: 4,
      name: "NGO Constitution.docx",
      type: "Word",
      size: "1.9 MB",
      date: "2025-02-15",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 5;

  const removeDocument = (id) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const addDocument = () => {
    const newDoc = {
      id: Date.now(),
      name: "New Document.pdf",
      type: "PDF",
      size: "500 KB",
      date: new Date().toISOString().split("T")[0],
    };
    setDocuments([...documents, newDoc]);
  };

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * docsPerPage;
  const indexOfFirst = indexOfLast - docsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDocs.length / docsPerPage);

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

          {/* Add Document */}
          <button
            onClick={addDocument}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-700 flex items-center gap-2"
          >
            <FaPlus /> Add Document
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Document</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Size</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 border">
                <td className="p-3  flex items-center gap-3">
                  <FaFileAlt className="text-blue-500 text-xl" />
                  {doc.name}
                </td>
                <td className="p-3 border">{doc.type}</td>
                <td className="p-3 border">{doc.size}</td>
                <td className="p-3 border">{doc.date}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
            {currentDocs.length === 0 && (
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
        {currentDocs.map((doc) => (
          <div
            key={doc.id}
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
              <span>{doc.size}</span>
              <span>{doc.date}</span>
            </div>
            <button
              onClick={() => removeDocument(doc.id)}
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <FaTrash /> Remove
            </button>
          </div>
        ))}
        {currentDocs.length === 0 && (
          <p className="text-center text-gray-500">No documents found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredDocs.length > docsPerPage && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDoc;
