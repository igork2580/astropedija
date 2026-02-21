/**
 * PDF Export utility — captures chart + data as a styled PDF.
 *
 * Uses jsPDF + html2canvas to render the chart section into a
 * downloadable PDF document with AstroPut branding.
 */

import { brand } from "./brand";

export async function exportChartToPdf(
  elementId: string,
  filename: string = "astroput-karta",
) {
  // Dynamic imports to keep bundle small
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas-pro"),
  ]);

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#1a1625",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // A4 dimensions in mm
  const pdfWidth = 210;
  const pdfHeight = 297;

  // Scale image to fit page width with margins
  const margin = 15;
  const usableWidth = pdfWidth - margin * 2;
  const ratio = usableWidth / imgWidth;
  const scaledHeight = imgHeight * ratio;

  const pdf = new jsPDF({
    orientation: scaledHeight > pdfHeight - 40 ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  // Header
  pdf.setFontSize(18);
  pdf.setTextColor(100, 102, 241); // primary #6466f1
  pdf.text(brand.name, margin, 15);

  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 160);
  pdf.text(brand.tagline, margin, 21);

  // Divider line
  pdf.setDrawColor(100, 102, 241);
  pdf.setLineWidth(0.5);
  pdf.line(margin, 24, pdfWidth - margin, 24);

  // Chart image
  const imgY = 28;
  const maxImgHeight =
    (pdf.internal.pageSize.getHeight() || pdfHeight) - imgY - 15;
  const finalHeight = Math.min(scaledHeight, maxImgHeight);
  const finalWidth = finalHeight === scaledHeight ? usableWidth : (finalHeight / scaledHeight) * usableWidth;

  pdf.addImage(imgData, "PNG", margin, imgY, finalWidth, finalHeight);

  // Footer
  const pageHeight = pdf.internal.pageSize.getHeight() || pdfHeight;
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 130);
  pdf.text(
    `${brand.url} — ${brand.copyright}`,
    margin,
    pageHeight - 8,
  );

  pdf.save(`${filename}.pdf`);
}
