"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { debounce } from "@/lib/utils";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

const ImageUploadForm = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string); // Set the uploaded image URL
      };
      reader.readAsDataURL(file);
    }

    try {
      const response = await axios.post("/api/image-upload", formData);
      console.log(response);

      if (!response) throw new Error("Failed to upload img");

      //   const data = await response.json();
      const data = response.data.publicId;
      setUploadedImage(data);
      console.log(data)
      setIsUploading(false);
    } catch (error) {
      console.log(error)
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        // document.body.removeChild(link);
      });
  };
  const pathname = usePathname();
  const obj = navLinks.find((obj) => obj.route === pathname);

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl lg:4xl mb-6 lg:mb-8 text-purple-400 capitalize">
        {obj?.label}
      </h1>
      <form className="flex flex-col gap-3 lg:gap-6 w-full">
        <div className="flex flex-col gap-2 ">
          <Label>Upload an image</Label>
          <Input
            type="file"
            className="w-full"
            onChange={handleFileUpload}
          ></Input>
        </div>

        <div className="flex flex-col gap-2 ">
          <Label>Select a format</Label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
            className="w-full rounded-md outline-none text-gray-600 font-semibold appearance-none border px-3 py-2 border-gray-200 text-sm"
          >
            {Object.keys(socialFormats).map((key) => (
              <option
                className="px-3 text-sm py-1 outline-none text-gray-600 font-semibold hover:bg-transparent hover:bg-red-200 appearance-none"
                value={key}
                key={key}
              >
                {key}
              </option>
            ))}
          </select>
        </div>

        {isUploading && (
          <div className="LOADER flex gap-2 items-center justify-center font-semibold text-lg text-center text-gray-600 animate-pulse">
            <p>Loading Preview...</p>
          </div>
        )}
        {uploadedImage && (
          <div className="flex flex-col gap-3">
            <Label>Image Preview </Label>
            {/* {imageSrc && <Image className=" object-cover rounded-xl border border-black p-4" src={imageSrc} width={400} height={400} alt="img"></Image>} */}

            {imageSrc && (
              <div className="rounded-xl shadow-2xl my-4">
                <CldImage
                  className="rounded-lg w-full"
                  width={socialFormats[selectedFormat].width}
                  height={socialFormats[selectedFormat].height}
                  src={uploadedImage}
                  sizes="100vw"
                  alt="Modified image"
                  crop="fill"
                  aspectRatio={socialFormats[selectedFormat].aspectRatio}
                  gravity="auto"
                  ref={imageRef}
                  onError={() => {
                    debounce(() => {
                      setIsTransforming(false);
                      console.log(isTransforming);
                    },8000)
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* {imageSrc && (
          <canvas
            ref={canvasRef}
            className="hidde"
            style={{ border: "1px solid black" }}
          ></canvas>
        )} */}
        <Button onClick={handleDownload} type="button" className="bg-purple-600 hover:bg-[#1c0080]">
          Download the resized image.
        </Button>
      </form>
    </section>
  );
};

export default ImageUploadForm;
