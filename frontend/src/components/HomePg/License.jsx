import React, { useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";

const License = () => {
  const [licenses] = useState([
    {
      id: 1,
      title: "Registration Certificate",
      description:
        "Government-approved registration certificate of AAEAR Foundation.",
      fileUrl: "/docs/registration-certificate.pdf",
    },
    {
      id: 2,
      title: "80G Certificate",
      description:
        "Tax exemption certificate under section 80G of Income Tax Act.",
      fileUrl: "/docs/80g-certificate.pdf",
    },
    {
      id: 3,
      title: "12A Certificate",
      description:
        "NGO 12A Registration certificate for charitable trust exemption.",
      fileUrl: "/docs/12a-certificate.pdf",
    },
  ]);

  return (
    <div className="bg-gray-50 py-12 px-6">
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
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <FaEye /> View
              </a>
              <a
                href={doc.fileUrl}
                download
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                <FaDownload /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default License;
