import z from "zod";

// const createPatient = z.object({
//     password: z.string(),
//     patient: z.object({
//         name: z.string().nonempty("name is required"),
//         email: z.string().nonempty("email is required"),
//         address: z.string().optional(),
//     })
// })
const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z.email(),
    name: z.string({ error: "Name is required!", }),
    contactNumber: z .string({ error: "Contact number is required!", }) .optional(),
    // address: z .string({ error: "Address is required", }) .optional(),
  }),
});

export const userValidation = {
    createPatient,
}