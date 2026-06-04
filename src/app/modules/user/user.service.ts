import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { Patient, UserRole } from "@prisma/client";

const createPatient = async(req: Request): Promise<Patient> => {

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
                // role: req.body.patient.role ?? "PATIENT",
                role: UserRole.PATIENT,
                needPasswordChange: false,
            }
        })

        return await tnx.patient.create({
          data: req.body.patient,
        });
    })

    return result;
}

const getAllFromDB = async ({page, limit}: {page: number, limit: number}) => {
    const result = await prisma.user.findMany();
    return result;
}

export const UserService = {
    createPatient,
    getAllFromDB,
}