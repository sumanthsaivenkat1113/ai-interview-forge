import { auth } from '@clerk/nextjs/server'

export const GET = async () => {
  // Returns a `404` error for unauthenticated requests
  const { userId } = await auth.protect()

  return Response.json({ userId })
}