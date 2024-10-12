import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
  const user = auth();
  if(!user){
    redirect("/");
  }
  return (
    <div>
      social share
    </div>
  )
}

export default page
