import Link from "next/link"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPassword() {

    return (
        <form className="space-y-4">
            <div className="space-y-4">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email" />
            </div>

            <Button type="submit" className="w-full">
                Recover password
            </Button>

            <Button variant='link' size='sm' className="w-full">
                <Link href="/auth/sign-in">
                    Sign in instead
                </Link>
            </Button>
        </form>
    )
}