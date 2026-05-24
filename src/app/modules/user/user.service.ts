import bcrypt from "bcryptjs";
import { createPatientInput } from "./user.interface";
import { prisma } from "../../shared/prisma";

const createPatient = async(payload: createPatientInput) => {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashPassword = await bcrypt.hash(payload.password, saltRounds);

    const result = await prisma.$transaction(async (tnx: { user: { create: (arg0: { data: { email: string; password: string; }; }) => any; }; patient: { create: (arg0: { data: { name: string; email: string; }; }) => any; }; }) => {
        await tnx.user.create({
            data: {
                email: payload.email,
                password: hashPassword,
            }
        })

        return await tnx.patient.create({
            data: {
                name: payload.name,
                email: payload.email,
            }
        })
    })

    return result;
}

export const UserService = {
    createPatient,
}