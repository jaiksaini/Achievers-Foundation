import PDFDocument from "pdfkit";
import numWords from "num-words"; 

export const generateReceipt = (donation, donor, res = null) => {
  const doc = new PDFDocument({ margin: 50 });

  if (res) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${donation._id}.pdf`
    );
    doc.pipe(res);
  }

  // ========== HEADER ==========
  doc.fontSize(18).text("AAEAR Foundation", { align: "center", bold: true });
  doc.fontSize(10).text(
    "(Academics Achievers Education and Research Foundation)",
    { align: "center" }
  );

  doc.moveDown(1);

  doc.fontSize(14).text("DONATION RECEIPT", { align: "center", underline: true });
  doc.moveDown();

  // ========== RECEIPT INFO ==========
  doc.fontSize(12)
    .text(`Receipt No: ${donation._id}`)
    .text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`, {
      align: "left",
    });

  doc.text(`Donor Name: ${donor.name || "N/A"}`, { align: "right" });
  doc.text(`Donor Email: ${donor.email || "N/A"}`, { align: "right" });
  doc.moveDown();

  // ========== MESSAGE ==========
  doc.text(
    "We extend our sincerest gratitude for your generous contribution.",
    { align: "left" }
  );
  doc.moveDown();

  // ========== DONATION DETAILS ==========
  doc.fontSize(12).text("Description", 70).text("Amount (INR)", 400);
  doc.moveTo(50, doc.y + 2).lineTo(550, doc.y + 2).stroke();

  doc.moveDown(0.5);
  doc.text(donation.purpose || "General Education Fund Donation", 70);
  doc.text(`${donation.amount.toFixed(2)}`, 400);
  doc.moveDown(1.5);

  // ========== TAX INFO ==========
  doc.fontSize(10).text(
    "This donation is eligible for tax exemption under section 80G of the Income Tax Act, 1961."
  );
  doc.text(
    "Our registration number is [217776]."
  );
  doc.moveDown();

  // ========== TOTAL ==========
  doc.fontSize(12).text(
    `Total Donated: INR ${donation.amount.toFixed(2)}`,
    { bold: true }
  );
  doc.text(
    `In words: (INR ${numWords(donation.amount).toUpperCase()} Only)`
  );
  doc.moveDown();

  // ========== FOOTER ==========
  doc.fontSize(10).text(
    "Thank you for empowering education and research.",
    { align: "left" }
  );
  doc.moveDown(2);

  doc.text("For AAEAR Foundation", { align: "right" });
  doc.moveDown().text("Authorised Signatory", { align: "right" });

  doc.moveDown(2);
  doc.fontSize(9).text(
    "AAEAR Foundation | Umrapur, Ibrahimpur, Raebareli 229212, Uttar Pradesh, India"
  );
  doc.text("Contact: academicsachieversfoundation@gmail.com | +91 90264 70888");
  // doc.text("www.thorised.org");

  doc.end();
  return doc;
};

export default generateReceipt;
