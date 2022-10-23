import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useQueryClient} from 'react-query'
import RequireAuth from './RequireAuth'

const Product = ({product}) => {
    console.log(product)
    const location = useLocation();
    const path = location.pathname.split('/')[1]
    const {user} = useSelector(state => state.user)
    // console.log(user.id)
    // console.log(user)
    const useQuery = useQueryClient()
    const handleAddToCart = async () => { 
        const API_URL = `${process.env.API_URL}/${product._id}/cart`
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: user.id 
            }),
        })
        const data = await response.json()
        console.log(data)
        useQuery.invalidateQueries('cart')
    }  
  return (
    <div className='border shadow-lg py-[0.65rem] rounded-lg px-[0.65rem] w-[20rem] my-[1rem] max-h-[27rem]'>
        <img src={product.img}  alt={product.name} className='w-[20rem] h-45'/>
        <div className='mt-3'>
            <h3 className='text-left font-semibold text-xl'>{product.name}</h3>
            <p className='flex flex-wrap text-left max-w-[19rem] my-2'>{product.desc}</p>
            <p className='text-left font-semibold mt-3'>${product.price}</p>
           
            <div className = 'flex justify-start mt-2'>
                <Link  to ={`/product/${product._id}`}>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy Now
                </button> 
               {
                path === 'product'?<RequireAuth>
                <button
                 onClick={handleAddToCart}
                 type="button" class="text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-purple-800 dark:hover:bg-purple-700 dark:focus:ring-purple-700 dark:border-purple-700">
                    Add To Cart
                </button></RequireAuth>
                : <></>
                }
                </Link>
                
            </div>
            
        </div>

    </div>
  )
}

export default Product