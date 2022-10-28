import React from 'react'
import {useSelector} from 'react-redux';
import {useQuery, useQueryClient} from 'react-query';
import useGetCart from '../helpers/useGetCart'
const Cart = () => {
  const  {user} = useSelector(state => state.user);
  const {data, isLoading, isError} = useGetCart(user.id);
  const queryClient = useQueryClient()
 
  const handleRemoveClick = async (id) => {
    const REACT_APP_API_URL = `https://peaceful-beyond-47525.herokuapp.com/cart/${id}/decrement`
    const response = await fetch(REACT_APP_API_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userid: user.id
        }),
    })
    const data = await response.json()
    console.log(data)
    queryClient.invalidateQueries('cart')
  }

  const handleAddClick = async (id) => {
    const REACT_APP_API_URL = `https://peaceful-beyond-47525.herokuapp.com/cart/${id}/increment`
    const response = await fetch(REACT_APP_API_URL, {
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
    queryClient.invalidateQueries('cart')

  }

  return (
    <main className='flex justify-center w-full'>
        <div className = 'flex justify-around w-full'>
        {
            isLoading ? <h1>Loading...</h1>  
       
            :<div className = 'flex flex-col md:flex-row'>
            <aside className='w-[23rem] md:w-[30rem] '>
                <h1 className = 'text-xl md:my-3 text-left my-3'>Items in your cart</h1>
                <div>
                    {
                        data?.cart.map(item => {
                            if(item.count === 0){
                                return <></>
                            }
                            return (
                               <ItemTile item = {item} handleAddClick = {handleAddClick} handleRemoveClick = {handleRemoveClick}/>
                            )
                        })
                    }
                    
                </div>

            </aside> 
            <div>
                <h2 className = 'text-left text-xl my-3'>Summary</h2>
                <section className = 'border-2 border-b-0 border-slate-300 rounded-lg'>
                    
                        {
                            data?.cart?.map((item)=>{
                                if(item.count === 0){
                                    return null
                                }
                                return <div className = 'flex border-b border-slate-300 p-3 '>
                                    <p> <span className ='font-semibold'>{item.name}</span> - <span>${item.price} x {item.count}</span></p> 
                                </div>
                            })
                        }
                        <p className = 'border-b border-slate-300 rounded-lg p-3'>
                            <span className = 'font-semibold'>Total Amount : ${data.totalAmount}</span>
                        </p>
                </section> 
                <div className = 'flex justify-start mt-3'>
                    <button type="button" class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Checkout
                    </button>
                </div>
            </div>

             </div>
        }
      
        </div>
    </main>
  )
}
const ItemTile = ({item, handleAddClick, handleRemoveClick}) => {
    return  <div className='flex  items-center 
    border-2 border-slate-300 rounded-lg'>
      
      <img src={item.img} alt={item.name} width={140} className = "w-[6rem] md:w-[10rem]"/>
      <div className='md:ml-[2rem]  p-2 text-left  gap-1  w-[20rem] md:w-[25rem] mx-auto'>
          <h3 className='text-xl font-semibold'>{item.name}</h3>
          {/* <div className='flex flex-col border-2 border-emerald-500 items-center'> */}          
              {/* </div> */}
              <p className = 'mt-1'>Price: ${item.price}</p>
        
      </div>
      <div className="flex flex-row justify-center h-10 w-full rounded-lg  bg-transparent mt-1">
                      <button data-action="decrement" className=" bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-10 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin" onClick={() =>handleRemoveClick(item.id)}>−</span>
                      </button>
                      {
                         <span className='flex  items-center justify-center px-2 bg-gray-100'> {item.count}</span>
                      }
                      <button data-action="increment" className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-10 rounded-r cursor-pointer">
                          <span className="m-auto text-2xl font-thin" onClick={() => handleAddClick(item.id)}>+</span>
                      </button>
                  </div>
       </div>
}
export default Cart