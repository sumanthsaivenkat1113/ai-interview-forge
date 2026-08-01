import { auth } from '@clerk/nextjs/server'
import Dashboard from "@/client/components/dashboard/dashboard"
export default async function HomePage(){
    // await auth.protect()
    return <Dashboard/>
}