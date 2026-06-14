import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { Patient, Prisma, UserRole } from "@prisma/client";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchableFields } from "./user.constant";

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

const createAdmin = async(req: Request): Promise<Patient> => {

    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePicture = uploadedResult?.secure_url;
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.admin.email,
                password: hashPassword,
                // role: req.body.patient.role ?? "PATIENT",
                role: UserRole.ADMIN,
                needPasswordChange: false,
            }
        })

        return await tnx.admin.create({
          data: req.body.admin,
        });
    })

    return result;
}

const createDoctor = async(req: Request): Promise<Patient> => {

    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.doctor.profilePicture = uploadedResult?.secure_url;
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.doctor.email,
                password: hashPassword,
                // role: req.body.patient.role ?? "PATIENT",
                role: UserRole.DOCTOR,
                needPasswordChange: false,
            }
        })

        return await tnx.doctor.create({
          data: req.body.doctor,
        });
    })

    return result;
}

// const getAllFromD = async ({page, limit, searchTerm, sortBy, sortOrder}: {page: number, limit: number, searchTerm?: any, sortBy: any, sortOrder: any}) => {
//     const pageNumber = page || 1;
//     const limitNumber = limit || 10;
//     const skip = (pageNumber - 1) * limitNumber;
//     const result = await prisma.user.findMany({
//         skip,
//         take: limitNumber,

//         where: {
//             email: {
//                 contains: searchTerm,
//                 mode: "insensitive"
//             }
//         },

//         orderBy: sortBy && sortOrder ? {
//             [sortBy]: sortOrder
//         } : {
//             createdAt: "asc"
//         }
//     });
//     return result;
// }

const getAllFromDB = async (params: any, options: any) => {

  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? {
        AND: andConditions,
      }
      : {};


  const result = await prisma.user.findMany({
    skip,
    take: limit,

    where: whereConditions,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result
  };
}

export const UserService = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFromDB,
}