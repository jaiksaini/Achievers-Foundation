import React, { useState } from "react";
import { FaEye, FaFilePdf, FaFileAlt } from "react-icons/fa";
import pdf from "../assets/Doc/pdf";

const Documents = () => {
  const [licenses] = useState([
    {
      id: 1,
      title: "Certificate of Incorporation",
      description:
        "Government-approved registration certificate of AAEAR Foundation.",
      fileUrl: pdf.Certificate_of_Incorporation,
    },
    {
      id: 2,
      title: "80G Certificate",
      description:
        "Tax exemption certificate under section 80G of Income Tax Act.",
      fileUrl: pdf.form80G,
    },
    {
      id: 3,
      title: "12A Certificate",
      description:
        "NGO 12A Registration certificate for charitable trust exemption.",
      fileUrl: pdf.Form12A,
    },
  ]);

  const [documents] = useState([
    {
      id: 1,
      title: "Ministry Data",
      type: "pdf",
      description: "Ministry Of Corporate Affairs - MCA Services.",
      fileUrl: pdf.MinistryData,
    },
    {
      id: 2,
      title: "Section 8 Licence",
      type: "pdf",
      description: "SPICE + Part B_Section 8 License_AB2740996_27",
      fileUrl: pdf.Section_8_Licence,
    },
    {
      id: 3,
      title: "e-AOA",
      type: "pdf",
      description: "INC-31_1-16603026542",
      fileUrl: pdf.e_AOA,
    },
    {
      id: 4,
      title: "e-MOA",
      type: "pdf",
      description: "INC-13_1-16603026552",
      fileUrl: pdf.e_MOA,
    },
    {
      id: 5,
      title: "INC-9",
      type: "pdf",
      description: "INC-9_28_02_2025_signed",
      fileUrl: pdf.INC_9,
    },
  ]);

  const [selectedDoc, setSelectedDoc] = useState(null);

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-3xl" />;
      default:
        return <FaFileAlt className="text-gray-500 text-3xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:pb-10">
      <div className="bg-gray-50 pb-10">
        {/* Header Section */}
        <section className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            NGO Licenses & Certificates
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Transparency is our priority. Below are the official licenses and
            certificates of AAEAR Foundation that validate our work and
            compliance.
          </p>
        </section>

        {/* License Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {licenses.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {doc.title}
              </h2>
              <p className="text-gray-600 flex-1">{doc.description}</p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  <FaEye /> View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for PDF preview */}
        {selectedDoc && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] md:w-[70%] h-[80%] rounded-lg shadow-lg overflow-hidden relative">
              <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-red-600 font-bold text-lg"
                >
                  ✖
                </button>
              </div>

              <embed
                src={selectedDoc.fileUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
                type="application/pdf"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl text-center md:text-3xl font-bold text-gray-800 mb-6">
          Other Documents of Foundation
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                {getFileIcon(doc.type)}
                <h2 className="text-lg font-semibold text-gray-800">
                  {doc.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm flex-1">{doc.description}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <FaEye /> View
                </button>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No documents available at the moment. Please check back later.
          </p>
        )}

        {selectedDoc && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] md:w-[70%] h-[80%] rounded-lg shadow-lg overflow-hidden relative">
              <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-red-600 font-bold text-lg"
                >
                  ✖
                </button>
              </div>

              <embed
                src={selectedDoc.fileUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
                type="application/pdf"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
