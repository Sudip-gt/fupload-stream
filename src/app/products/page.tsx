import { prisma } from '@/db';
import React from 'react'
import { PaginationDemo } from './pagination-demo';

const Products = async ({searchParams} : {searchParams: {catagory: string; page: string}}) => {
    const PAGE_SIZE = 2;
    const products = await prisma.products.findMany(
        {
            // where: {
            //     catagory: "shoe",
            // },
            skip: (Number(searchParams.page) - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        }
    );
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Products</h1>
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
  )
}

export default Products


