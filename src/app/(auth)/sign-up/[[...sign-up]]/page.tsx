import { SignUp } from '@clerk/nextjs'
// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
import React from 'react'

export default function SignUpPage() {
  // const user = auth();
  // if(user){
  //   redirect("/");
  // }
  return (
    <SignUp></SignUp>
  )
}
