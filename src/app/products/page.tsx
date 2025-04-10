import { prisma } from '@/db';
import React from 'react';
import { PaginationDemo } from './pagination-demo';

interface ProductsProps {
  searchParams: { category: string; page: string };
}

const Products = async ({ searchParams }: ProductsProps) => {
  const PAGE_SIZE = 2;

  // Ensure page is parsed correctly
  const page = Number(searchParams.page) || 1; // Default to 1 if no page

  // Fetch products using Prisma
  const products = await prisma.products.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-6 mt-6 mb-6">
        {products?.map((product) => (
          <div key={product.id}>
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 capitalize">{product.catagory}</p>
          </div>
        ))}
      </div>
      <PaginationDemo />
    </div>
  );
};

// Export the component
export default Products;
