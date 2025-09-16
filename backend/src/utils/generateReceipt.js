import PDFDocument from "pdfkit";
import numWords from "num-words"; // npm install num-words

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

  // Header
  doc.fontSize(16).text("BHARAT CHARITY TRUST", { align: "center" });
  doc.fontSize(10).text("JAN KALYAN BHAWAN, LOK SEWA MARG, NEW DELHI", {
    align: "center",
  });
  doc.text("Email: donate@bharatcharity.in | www.bharatcharity.in", {
    align: "center",
  });

  doc.moveDown();
  doc.fontSize(14).text("DONATION RECEIPT", { align: "center", underline: true });
  doc.moveDown();

  // Receipt info
  doc.fontSize(12)
    .text(`Receipt No: ${donation._id}`)
    .text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`)
    .moveDown();

  // Donor info
  doc.text(`Received with thanks from: ${donor.name}`)
    .text(`Address: ${donor.address || "N/A"}`)
    .text(`PAN: ${donor.pan || "N/A"}`)
    .moveDown();

  // Payment info
  doc.text(`The sum of ₹${donation.amount}`)
    .text(`In words: (INR ${numWords(donation.amount).toUpperCase()} Only)`)
    .text(`Towards: ${donation.purpose || "General Donation"}`)
    .text(`By mode of: ${donation.paymentMethod}`)
    .text(`Transaction ID: ${donation.transactionId}`)
    .moveDown();

  // Tax info
  doc.fontSize(10)
    .text("Eligible under Section 80G of the Income Tax Act, 1961.")
    .text("Unique Reg. No: ABDCE1234A01012021 | Date: 01-Jan-21")
    .moveDown();

  // Terms
  doc.fontSize(9)
    .text("Terms & Conditions:", { underline: true })
    .text("1. Cheque / DD is subject to realisation.")
    .text("2. Registration Number: DELHI/2021/10")
    .moveDown(2);

  doc.text("For BHARAT CHARITY TRUST", { align: "right" });
  doc.moveDown().text("Authorised Signatory", { align: "right" });

  doc.end();

  return doc;
};


export default generateReceipt;