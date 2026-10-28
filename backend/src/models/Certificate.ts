import mongoose, { Document, Schema } from "mongoose";

export interface ICertificate extends Document {
    certificateId: string;
    recipientName: string;
    courseName: string;
    organizationName: string;
    issueDate: string;
    duration: string;
    createdAt: Date;
}

const certificateSchema = new Schema<ICertificate>(
    {
        certificateId: {
            type: String,
            required: true,
            unique: true
        },

        recipientName: {
            type: String,
            required: true,
            trim: true
        },

        courseName: {
            type: String,
            required: true,
            trim: true
        },

        organizationName: {
            type: String,
            required: true,
            trim: true
        },

        issueDate: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Certificate = mongoose.model<ICertificate>(
    "Certificate",
    certificateSchema
);

export default Certificate;