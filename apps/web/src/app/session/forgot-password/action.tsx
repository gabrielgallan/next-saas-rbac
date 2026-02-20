'use server'

import { HTTPRecoverPassword } from "@/http/recover-password"
import { HTTPError } from "ky"
import z from "zod"

export async function requestPasswordRecover(
    // previousState: any,
    formData: FormData
) {
    const formDataSchema = z.object({
        email: z.string().email({ message: 'Please, provide a valid e-mail address.' }),
    })

    const parser = formDataSchema.safeParse(Object.fromEntries(formData))

    if (!parser.success) {
        const errors = parser.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { email } = parser.data

    try {
        await HTTPRecoverPassword({ email })
        
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