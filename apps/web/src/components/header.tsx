import Image from "next/image";
import { ProfileButton } from "./profile-button";
import { Slash } from "lucide-react";
import { OrganizationSwitcher } from "./organization-switcher";

const icon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'

export async function Header() {
    return (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
                <Image
                    width={0}
                    height={0}
                    src={icon}
                    className="size-6 dark:invert"
                    alt="Next"
                />

                <Slash className="size-3 -rotate-[24deg] text-border" />

                <OrganizationSwitcher />
            </div>

            <div className="flex items-center gap-4">
                <ProfileButton />
            </div>
        </div>
    )
}