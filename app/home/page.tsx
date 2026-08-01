import { auth } from '@clerk/nextjs/server'
import Dashboard from "@/client/components/dashboard/dashboard"
import { UserService } from "@/server/modules/user/user.service";
export default async function HomePage(){
    // await auth.protect()
    const user = await UserService.createOrSync();
     return (
    <>
      <Dashboard user={user}/>
    </>
  );
}