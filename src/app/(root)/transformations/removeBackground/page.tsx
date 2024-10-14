import RemoveBackground from '@/components/shared/RemoveBackground';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    const {userId} = auth();
    if(!userId) redirect("/sign-in");
  return (
    <section>
        <RemoveBackground></RemoveBackground>
    </section>
  )
}

export default page
