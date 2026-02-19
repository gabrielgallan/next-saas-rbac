'use server'

import { httpSignInWithCredentials } from "@/http/sign-in-with-credentials"
import { HTTPError } from "ky"
import { cookies } from "next/headers"
import z from "zod"

export async function signInWithCredentials(
    // previousState: any,
    formData: FormData
) {
    const formDataSchema = z.object({
        email: z.string().email({ message: 'Please, provide a valid e-mail address.' }),
        password: z.string().min(6, { message: 'Password must have 6 characters' })
    })

    const parser = formDataSchema.safeParse(Object.fromEntries(formData))

    if (!parser.success) {
        const errors = parser.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { email, password } = parser.data

    try {
        const { token } = await httpSignInWithCredentials({
            email,
            password,
        })

        const Cookies = await cookies()

        Cookies.set('token', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
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