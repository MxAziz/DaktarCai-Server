import express from 'express';
import { UserController } from './user.controller';

export const router = express.Router();

router.post('/create-patient', UserController.createPatient);

export const userRoutes = router;
