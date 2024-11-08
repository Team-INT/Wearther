import { z } from "zod";

const userName = z.string()
const email = z.string()
const password = z.string()

export const loginSchema = z.object({
  email : email,
  password : password
})

export type loginSchemaType = z.infer<typeof loginSchema>


export const registerSchema = z.object({
  userName : userName,
  email : email,
  password : password
})

export type registerSchemaType = z.infer<typeof registerSchema>