import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../helper/fileUploader';
import { userValidation } from './user.validation';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  UserController.getAllFromDB,
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = userValidation.createPatient.parse(JSON.parse(req.body.data))

        return UserController.createPatient(req, res, next);
  },

);

router.post(
  "/create-admin",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))

        return UserController.createAdmin(req, res, next);
  },

);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))

        return UserController.createDoctor(req, res, next);
  },

);

export const userRoutes = router;
