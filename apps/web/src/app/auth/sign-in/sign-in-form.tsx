'use client'

import Link from "next/link"
import { AlertTriangle, Loader2 } from 'lucide-react'

// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Actions
import { signInWithCredentials } from "./actions"

import { useFormState } from "@/hooks/use-form-state"
import { useRouter } from "next/navigation"
import { signInWithGithub } from "../actions"

const githubIcon = '/github.svg'

export function SignInForm() {
    // const [
    //     { success, message, errors }, dispatchAction, isPending] = useActionState(
    //         signInWithCredentials,
    //         { success: false, message: null, errors: null }
    //     )
    const router = useRouter()

    const [{ success, message, errors }, handleSignIn, isPending] = useFormState(
        signInWithCredentials,
        () => {
            router.push('/')
        }
    )

    return (
        <div className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
                {success === false && message && (
                    <Alert variant="destructive">
                        <AlertTriangle className="size-4" />
                        <AlertTitle>Sign in failed!</AlertTitle>
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

                <div className="space-y-4">
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" id="password" />

                    {errors?.password && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.password[0]}
                        </p>
                    )}

                    <Link
                        href="/auth/forgot-password"
                        className="text-xs font-medium text-foreground hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <Button type="submit" className="w-full">
                    {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sign in'}
                </Button>
            </form>

            <Separator />

            <form action={signInWithGithub}>
                <Button type="submit" className="w-full">
                    <img
                        className="size-5 mr-2 dark:invert"
                        src={githubIcon}
                        alt=""
                    />
                    Sign in with GitHub
                </Button>
            </form>

            <Button variant='link' size='sm' className="w-full">
                <Link href="/auth/sign-up">
                    Don't have an account ? Sign up
                </Link>
            </Button>
        </div>
    )
}