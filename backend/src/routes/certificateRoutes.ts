import express from "express";
import {
    createCertificate,
    downloadCertificate,
    verifyCertificate,
    getCertificateJSON
} from "../controllers/certificateController";

const router = express.Router();

router.post("/", createCertificate);

router.get("/:certificateId/download", downloadCertificate);

router.get("/:certificateId/verify", verifyCertificate);

router.get("/:certificateId/json", getCertificateJSON);

export default router;