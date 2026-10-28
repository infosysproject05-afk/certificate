import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { ICertificate } from "../models/Certificate";

export const generateCertificatePDF = (
    certificate: ICertificate
): Promise<string> => {

    return new Promise((resolve, reject) => {

        const certificatesFolder = path.join(
            process.cwd(),
            "certificates"
        );

        // Create certificates folder if it doesn't exist
        if (!fs.existsSync(certificatesFolder)) {
            fs.mkdirSync(certificatesFolder);
        }

        const fileName = `${certificate.certificateId}.pdf`;

        const filePath = path.join(
            certificatesFolder,
            fileName
        );

        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        });

        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Title
        doc
            .fontSize(30)
            .font("Helvetica-Bold")
            .text("CERTIFICATE OF COMPLETION", {
                align: "center"
            });

        doc.moveDown(2);

        // Certificate text
        doc
            .fontSize(16)
            .font("Helvetica")
            .text("This certificate is proudly presented to", {
                align: "center"
            });

        doc.moveDown();

        // Recipient name
        doc
            .fontSize(28)
            .font("Helvetica-Bold")
            .text(certificate.recipientName, {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(16)
            .font("Helvetica")
            .text("for successfully completing", {
                align: "center"
            });

        doc.moveDown();

        // Course name
        doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .text(certificate.courseName, {
                align: "center"
            });

        doc.moveDown(2);

        doc
            .fontSize(15)
            .font("Helvetica")
            .text(`Organization: ${certificate.organizationName}`, {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(15)
            .text(`Duration: ${certificate.duration}`, {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(15)
            .text(`Issue Date: ${certificate.issueDate}`, {
                align: "center"
            });

        doc.moveDown(2);

        // Certificate ID
        doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .text(`Certificate ID: ${certificate.certificateId}`, {
                align: "center"
            });

        doc.moveDown(3);

        // Organization
        doc
            .fontSize(14)
            .font("Helvetica")
            .text(certificate.organizationName, {
                align: "center"
            });

        doc.end();

        stream.on("finish", () => {
            resolve(filePath);
        });

        stream.on("error", (error) => {
            reject(error);
        });
    });
};