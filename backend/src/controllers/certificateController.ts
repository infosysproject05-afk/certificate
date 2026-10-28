import { Request, Response } from "express";
import Certificate from "../models/Certificate";
import crypto from "crypto";
import { generateCertificatePDF } from "../services/certificateService";

export const createCertificate = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            recipientName,
            courseName,
            organizationName,
            issueDate,
            duration
        } = req.body;

        if (
            !recipientName ||
            !courseName ||
            !organizationName ||
            !issueDate ||
            !duration
        ) {
            res.status(400).json({
                message: "All certificate details are required"
            });
            return;
        }

        // Generate unique certificate ID
        const randomId = crypto
            .randomBytes(4)
            .toString("hex")
            .toUpperCase();

        const certificateId = `CERT-${new Date().getFullYear()}-${randomId}`;

        // Save certificate details in MongoDB
        const certificate = await Certificate.create({
            certificateId,
            recipientName,
            courseName,
            organizationName,
            issueDate,
            duration
        });

        // Generate PDF
        const pdfPath = await generateCertificatePDF(certificate);

        // Send response
        res.status(201).json({
            message: "Certificate created successfully",
            certificateId: certificate.certificateId,
            certificate: certificate,
            pdfPath: pdfPath
        });

    } catch (error) {
        console.error("Certificate creation error:", error);

        res.status(500).json({
            message: "Failed to create certificate"
        });
    }
};
export const downloadCertificate = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { certificateId } = req.params;

        const certificate = await Certificate.findOne({
            certificateId
        });

        if (!certificate) {
            res.status(404).json({
                message: "Certificate not found"
            });
            return;
        }

        const pdfPath = await generateCertificatePDF(certificate);

        res.download(
            pdfPath,
            `${certificate.certificateId}.pdf`,
            (error) => {
                if (error) {
                    console.error("PDF download error:", error);
                }
            }
        );

    } catch (error) {
        console.error("Certificate download error:", error);

        res.status(500).json({
            message: "Failed to download certificate"
        });
    }
};
export const verifyCertificate = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { certificateId } = req.params;

        const certificate = await Certificate.findOne({
            certificateId
        });

        if (!certificate) {
            res.status(404).json({
                verified: false,
                message: "Certificate not found"
            });
            return;
        }

        res.status(200).json({
            verified: true,
            message: "Certificate is valid",
            certificate
        });

    } catch (error) {
        console.error("Certificate verification error:", error);

        res.status(500).json({
            verified: false,
            message: "Verification failed"
        });
    }
};
export const getCertificateJSON = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { certificateId } = req.params;

        const certificate = await Certificate.findOne({
            certificateId
        });

        if (!certificate) {
            res.status(404).json({
                verified: false,
                message: "Certificate not found"
            });
            return;
        }

        res.status(200).json({
            verified: true,
            certificateId: certificate.certificateId,
            recipientName: certificate.recipientName,
            courseName: certificate.courseName,
            organizationName: certificate.organizationName,
            issueDate: certificate.issueDate,
            duration: certificate.duration
        });

    } catch (error) {
        console.error("Certificate JSON error:", error);

        res.status(500).json({
            verified: false,
            message: "Failed to generate certificate JSON"
        });
    }
};