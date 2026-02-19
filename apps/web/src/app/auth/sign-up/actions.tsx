'use server'

import { httpRegister } from "@/http/register"
import { httpSignInWithCredentials } from "@/http/sign-in-with-credentials"
import { HTTPError } from "ky"
import z from "zod"

export async function signUp(
    // previousState: any,
    formData: FormData
) {
    const formDataSchema = z.object({
        name: z.string(),
        email: z.string().email({ message: 'Please, provide a valid e-mail address.' }),
        password: z.string().min(6, { message: 'Password must have 6 characters' })
    })

    const parser = formDataSchema.safeParse(Object.fromEntries(formData))

    if (!parser.success) {
        const errors = parser.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { name, email, password } = parser.data

    try {
        const response = await httpRegister({
            name,
            email,
            password,
        })
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json()

            return { success: false, message, errors: null }
        }

        console.error(err)

        return { success: false, message: 'Unexpected error, try again in a few minutes', errors: null }
    }

    return { success: true, message: null, errors: null }
}