import { prisma } from "@/db";
import { uploadFile } from "./actions";
import Link from "next/link";

export default async function Home() {
  const images = await prisma.image.findMany();
  return (
    <>
      <header className="flex flex-col items-center p-4">
        <h1 className="font-bold mt-4">Day 29 of learning Next.js</h1>
      </header>
      <Link
  className="text-lg font-semibold text-white bg-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all mb-8"
  href="/products?category=shoe&page=1"
>
  🛍️ View Products
</Link>
      <form action={uploadFile} className="my-4 flex gap-4">


      <label className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all">
    📂 Choose File
    <input type="file" name="profile_image" className="hidden" />
  </label>


        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
      </form>

      {/* Image Grid Layout */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {images?.map((image) => (
          <div
            key={image.id}
            className="max-w-sm items-center rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-gray-800"
          >
            <img src={image.url} alt={image.name} className="rounded-md w-full h-auto" />
          </div>
        ))}
      </div>
    </>
  );
}

