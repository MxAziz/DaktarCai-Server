import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async(req: Request) => {

    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePicture = uploadedResult?.secure_url;
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword,
                role: req.body.patient.role ?? "PATIENT",
            }
        })

        return await tnx.patient.create({
          data: req.body.patient,
        });
    })

    return result;
}

export const UserService = {
    createPatient,
}