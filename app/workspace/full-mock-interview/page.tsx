import WorkspaceFMI from "@/client/components/workspaceFMI/workspaceFMI";
import { auth } from '@clerk/nextjs/server'

export default async function WorkspaceFMIPage() {
    await auth.protect()
    return (
        <>
            <WorkspaceFMI />
        </>
    )
}