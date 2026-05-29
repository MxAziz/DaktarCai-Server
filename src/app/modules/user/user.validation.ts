import z from "zod";

const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string().nonempty("name is required"),
        email: z.string().nonempty("email is required"),
        address: z.string().optional(),
    })
})

export const userValidation = {
    createPatientValidationSchema,
}