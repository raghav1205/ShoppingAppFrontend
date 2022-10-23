import React from 'react'
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useGetProductsList } from '../helpers/useGetProductsList';
import Review from '../components/Review';
import { useQuery } from 'react-query';

const useGetProduct = (productid) => {
    const {data, isLoading, error} = useQuery(['product', productid], () => {
        return fetch(`https://peaceful-beyond-47525.herokuapp.com/products/${productid}`).then(res => res.json())
    })
    console.log(data);
    return {data, isLoading, error}
}

const ProductPage = () => {
   
    const {productid} = useParams();
    
    const {data, isLoading, error} = useGetProduct(productid);

  return (
    <div className='font-montserrat'>
        {
            isLoading ?  <div>Loading...</div>
            : 
            <div className='flex'>
                <div className='flex md:flex-row flex-col justify-center items-center md:justify-start md:ml-[2rem] w-full'>
                    <div className='md:ml-[7rem] mx-auto w-[20rem] flex flex-col mb-auto items-start justify-start '>
                        <Product  product = {data}/>
                    </div>
                    <div className='md:grow md:w-full w-[20rem] mx-auto  flex justify-start mb-auto'>
                        <Review product = {data}/>
                    </div>
                </div>

            </div>
        }
    </div>
  )
}



export default ProductPage