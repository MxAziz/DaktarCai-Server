// import { z } from "zod";

// const createPatient = z.object({
//   password: z.string(),
//   patient: z.object({
//     email: z.string().email(),
//     name: z.string().min(1, "Name is required!"),
//     contactNumber: z.string().optional(),
//     address: z.string().optional(),
//   }),
// });

// export const userValidation = {
//   createPatient,
// };

import { z } from "zod";

const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z.string().refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Invalid email address" }
    ),
    name: z.string().min(1, "Name is required!"),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

const createAdmin = z.object({
  password: z.string(),
  admin: z.object({
    email: z.string().refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Invalid email address" }
    ),
    name: z.string().min(1, "Name is required!"),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

const createDoctor = z.object({
  password: z.string(),
  doctor: z.object({
    email: z.string().refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Invalid email address" }
    ),
    name: z.string().min(1, "Name is required!"),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    specialization: z.string().optional(),
  }),
});

export const userValidation = {
  createPatient,
  createAdmin,
  createDoctor,
};