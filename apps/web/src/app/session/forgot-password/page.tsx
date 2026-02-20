'use client'
import Link from "next/link"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/hooks/use-form-state"
import { requestPasswordRecover } from "./action"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"

import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
    const router = useRouter()
    
        const [{ success, message, errors }, handleRecoverPassword, isPending] = useFormState(
            requestPasswordRecover,
            () => {
                router.push('/session/sign-in')
            }
        )

    return (
        <form onSubmit={handleRecoverPassword} className="space-y-4">
            {success === false && message && (
                    <Alert variant="destructive">
                        <AlertTriangle className="size-4" />
                        <AlertTitle>Request recover failed!</AlertTitle>
                        <AlertDescription>
                            <p>{message}</p>
                        </AlertDescription>
                    </Alert>
                )}

            <div className="space-y-4">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="text" id="email" />
            </div>

            {errors?.email && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.email[0]}
                    </p>
                )}

            <Button type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Recover password'}
            </Button>

            <Button variant='link' size='sm' className="w-full">
                <Link href="/session/sign-in">
                    Sign in instead
                </Link>
            </Button>
        </form>
    )
}