import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

export default function SignInPage() {
  const user = auth();
  if(user){
    redirect("/");
  }
  return (
    <SignIn></SignIn>
  )
}
