import Card from "@/components/shared/Card";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const SERVICES = [
  {
    title: "BACKGROUND REMOVAL",
    description:
      "Easily removes the background of the image provided using AI.",
    btn: "Available",
  },
  {
    title: "IMAGE RESIZE",
    description:
      "Resize your image into common social media formats with content focused resizing.",
    btn: "Available",
  },
  {
    title: "BACKGROUND FILL",
    description:
      "Fills the background of the image provided with the desired color evenly without leaving outlines.",
    btn: "In production",
  },
  {
    title: "OBJECT FILL",
    description:
      "Adds object according to your prompt and the base or raw image with the power of AI.",
    btn: "In production",
  },
];

export default function Home() {
  const { userId } = auth();
  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl lg:text-4xl capitalize font-bold text-purple-400 w-full text-center">
        AI POWERED IMAGE TRANSFORMATION
      </h1>
      <div className="flex flex-wrap gap-6 lg:gap-8 w-full justify-center items-center">
        {SERVICES.map(({ title, description, btn }) => (
          <Card title={title} description={description} btn={btn}></Card>
        ))}
      </div>

      {!userId && <Link href="/sign-up" className="text-semibold text-sm text-purple-400 px-5 py-3 border-2 border-purple-300 w-max self-center shadow-xl">
        <span className=" text-purple-500 underline">Sign-up</span>&nbsp;and try out right away!
        </Link>}
    </section>
  );
}
