import React from 'react'
import Product from '../components/Product';
import { useGetProductsList } from '../helpers/useGetProductsList';

const Products = () => {
   const {data, isLoading, error} = useGetProductsList();

  return (
    <div>
        {
        isLoading ?  <div>Loading...</div>
        : 
        <>
        <div className='flex justify-center  md:w-full w-[20rem] mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                {data.map(product => <Product key={product._id} product={product}/>)}   
            </div>
        </div>
        </>
        }

    </div>
  )
}

export default Products