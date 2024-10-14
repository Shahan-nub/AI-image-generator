"use client";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";

const ImageUploadForm = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  // const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  //FILE UPLOAD
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file, file.name);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setImageSrc(e.target?.result as string);
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }

    // setIsUploading(false);
  };
  // FILE DOWNLOAD
  const handleDownload = () => {
    if (!imageRef.current) return;
    console.log("handleDownload called ");
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `no-bg.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  const pathname = usePathname();
  const obj = navLinks.find((obj) => obj.route === pathname);

  // TRANSFORMATION
  const handleTransformImage = async () => {
    if (rawFile) {
      try {
        const formData = new FormData();
        formData.append("image_file", rawFile);
        formData.append("size", "auto");
        setIsTransforming(true);
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          headers: { "X-Api-Key": "nUnWBU4Nj1ZRiMhE24Ez9spK" },
          body: formData,
        });

        const blob = await response.blob(); // Receive the processed image
        const imageUrl = URL.createObjectURL(blob); // Create URL for the processed image
        setTransformedImage(imageUrl);

        setIsTransforming(false);
      } catch (error) {
        console.log("transformation failed: ", error);
      }
    } else {
      console.log("transformation failed");
    }
  };

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl lg:4xl mb-6 lg:mb-8 text-purple-400 capitalize">
        {obj?.label}
      </h1>
      <form className="flex flex-col gap-3 lg:gap-6 w-full">
        <div className="flex flex-col gap-2 ">
          <Label>Upload an image</Label>
          <input
            type="file"
            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              handleFileUpload(e);
              const file = e.target.files?.[0];
              if (file) {
                setRawFile(file);
              }
            }}
          ></input>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 ">
          {uploadedImage && (
            <div className="flex flex-col gap-3 w-full lg:basis-1/2">
              <p className="text-sm text-gray-600 font-semibold ">
                Uploaded Image
              </p>
              <div className="p-3 rounded-xl w-full">
                {uploadedImage && (
                  <Image
                    src={uploadedImage}
                    width={300}
                    height={300}
                    alt="raw img"
                    className="w-full rounded-lg shadow-2xl"
                  ></Image>
                )}
              </div>
            </div>
          )}

          {/* PREVIEW  */}

          {isTransforming && (
            <div className="LOADER flex gap-2 items-center justify-center font-semibold text-lg text-center text-gray-600 animate-pulse">
              <p>Loading Preview...</p>
            </div>
          )}
          <div className="basis-1/2 flex flex-col gap-3">
            <p className="text-sm text-gray-600 font-semibold ">Transformation Preview</p>
            {transformedImage && (
              <div className="flex flex-col gap-3">
                {/* {imageSrc && <Image className=" object-cover rounded-xl border border-black p-4" src={imageSrc} width={400} height={400} alt="img"></Image>} */}

                {transformedImage && (
                  <div className="rounded-xl  p-3">
                    <Image
                      width={300}
                      height={300}
                      src={transformedImage}
                      ref={imageRef}
                      alt="background removal not possible"
                      className="w-full rounded-lg shadow-2xl"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={() => {
            if(uploadedImage) {
             handleTransformImage();
            }
          }}
          type="button"
          className={`${
            uploadedImage ? "opacity-100" : "opacity-20"
          }  hover:bg-[#1c0080] bg-purple-600 none`}
        >
          Remove Background
        </Button>
        <Button
          onClick={handleDownload}
          type="button"
          className="bg-purple-600 hover:bg-[#1c0080]"
        >
          Download formatted image.
        </Button>
      </form>
    </section>
  );
};

export default ImageUploadForm;
