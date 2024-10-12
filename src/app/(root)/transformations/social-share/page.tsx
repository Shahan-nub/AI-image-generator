import ImageUploadForm from '@/components/shared/ImageUploadForm'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <ImageUploadForm></ImageUploadForm>
  )
}

export default page
