export const dynamic = "force-dynamic"; //tells Next.js not to prerender the page at build time — instead,
                                        // render it on each request (which plays nicely with 
                                        // Prisma and database queries


import { prisma } from "@/db";
import { uploadFile } from "./actions";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";

export default async function Home() {
  const images = await prisma.image.findMany();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Learning Next.js
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Stream uploading to Cloudinary using streaming
        </h2>
      </header>

      <form
        action={uploadFile}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
      >
        <label className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all">
          📂 Choose File
          <input type="file" name="profile_image" className="hidden" />
        </label>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images?.map((image: ImageType) => (
          <div
            key={image.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
          >
            <Image
              src={image.url}
              alt={image.name}
              width={500}
              height={300}
              className="w-full object-cover"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
