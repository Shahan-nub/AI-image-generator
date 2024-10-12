import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});


export const POST = async (req: NextRequest) => {
  const { userId } = auth();
  // if (!userId) {
  //   return NextResponse.json(
  //     { message: "user unauthorized!" },
  //     { status: 400 }
  //   );
  // }

  try {
    // const uploadResult = await cloudinary.uploader
    //   .upload(
    //     "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    //     {
    //       public_id: "shoes",
    //       folder: "Images",
    //     }
    //   )
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log(uploadResult);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if(!file){
      return NextResponse.json({error: "File not found"}, {status: 400})
    }
    console.log(file);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );

    return NextResponse.json(
      { message: "image uploaded successfully.", publicId: result.public_id },
      { status: 200 }
    );
  } catch (error) {
    console.log("image upload failed :", error);
    return NextResponse.json(
      { message: "image-upload failed" },
      { status: 402 }
    );
  }
};

// (async function() {

//     // Configuration

//     // Upload an image

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();
