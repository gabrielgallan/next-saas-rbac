'use client'

import Link from "next/link"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signUp } from "./actions"
import { useFormState } from "@/hooks/use-form-state"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"
import Image from "next/image"


export function SignUpForm() {
    const githubIcon = '/github.svg'

    const [{ success, message, errors }, handleSignUp, isPending] = useFormState(signUp)

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
            {success === false && message && (
                <Alert variant="destructive">
                    <AlertTriangle className="size-5" />
                    <AlertTitle>Sign up failed!</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            <div className="space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input name="name" type="name" id="name" />

                {errors?.name && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.name[0]}
                    </p>
                )}
            </div>

            <div className="space-y-4">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email" />

                {errors?.email && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.email[0]}
                    </p>
                )}
            </div>

            <div className="space-y-4">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" id="password" />

                {errors?.password && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.password[0]}
                    </p>
                )}
            </div>

            <div className="space-y-4">
                <Label htmlFor="confirm_password">Confirm your password</Label>
                <Input name="confirm_password" type="password" id="confirm_password" />
            </div>

            <Button type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Create an account'}
            </Button>

            <Separator />

            <Button type="submit" className="w-full">
                <Image
                    width={0}
                    height={0}
                    className="size-5 mr-2 dark:invert"
                    src={githubIcon}
                    alt=""
                />
                Sign up with GitHub
            </Button>

            <Button variant='link' size='sm' className="w-full">
                <Link href="/session/sign-in">
                    Already registered ? Sign In
                </Link>
            </Button>
        </form>
    )
}