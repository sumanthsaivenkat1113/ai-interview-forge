import WorkspaceI from "@/client/components/workspaceI/workspaceI";
import { auth } from '@clerk/nextjs/server'

export default async function workspaceIPage() {
    await auth.protect()
    return <WorkspaceI />
}