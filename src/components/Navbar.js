import React, {useEffect, useState} from 'react'
import Register from '../pages/Register';
import { logout } from '../features/auth/userSlice';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import useAuth from '../helpers/useAuth';
import { FaShoppingCart } from 'react-icons/fa';
import useGetCart  from '../helpers/useGetCart';
import { RefModal } from './RefModal';

const Navbar = () => {
  const [name, setName] = useState('');
  const [showHamburger, setShowHamburger] = useState(false);
  const {user} = useSelector(state => state.user);
  const {logout2} = useAuth();
  console.log(user)
  const {data, isLoading, isError} = useGetCart(user?.id);
  useEffect(() => {
      console.log('rerender')

      console.log(user)
      setName(user?.username)
    
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
    logout2()
  }
  console.log(user)
  const dispatch = useDispatch();
  return (
    <div className='bg-blue-500 text-white py-3 px-[3rem] md:py-3.5 md:px-[4.5rem] flex items-center justify-between font-montserrat md:w-full  '>
        {/* <Register/> */}
    <div className='flex justify-start items-center font-orbitron'>
      <Link to = '/products'><p className='text-xl w-full  tracking-widest'>Shopping Cart</p></Link>
      <Link to = '/products'>
        <p className='text-md font-montserrat ml-[2rem] font-thin text-slate-50 hidden md:flex-inline'>Products</p>
      </Link>
      {
        user?.userType === 'retailer' ? 
        <Link to = '/new'>
           <p className='text-md  font-montserrat ml-[2rem] hidden md:flex'>
            New 
          </p>
        </Link>
        : null
      }
    </div>

     <div className='flex justify-end gap-3 mr-3 text-slate-50'>
      {
        user ? (
          <div className='flex flex-col  '>
            <div className=''>
              <Link to = '/cart'>
              <button type="button" class="md:flex hidden  relative items-end p-3 text-sm font-medium text-center text-white  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaShoppingCart className='text-xl'/>
                <span class="sr-only">Notifications</span>
                {
                  user ?
                <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full  dark:border-gray-900">{data?.cart?.reduce((acc, e) => {

                  if(e.count === 0){
                    return acc + 0
                  }
                  else {
                    return acc + 1
                  }
                }, 0 )}</div>
                : null
                }
                </button>
            </Link>
            </div>
          </div>
        )
        : null
      }
      {
        name !== '' && name !== null && name !== undefined ? <p className='md:flex hidden items-center justify-end '>Hi {user?.username}</p> : <></>
      }
      <div className = 'hidden md:flex  justify-end'>
      {
       !user ? <Link to = '/login'> <button className='mr-[1rem]'>Log In</button></Link>
        : <button onClick ={handleLogout}>Log out</button>
      }
      {
        !user ?
      <Link to = '/signup'>
         <button>
          Sign Up
        </button>
      </Link>
      : null
      }
     </div>
      
    </div>
    <div  className='md:hidden flex-col '>
      <div class="p-4 space-y-2 bg-sky-800 rounded shadow cursor-pointer md:hidden flex flex-col" onClick = {() => {setShowHamburger(!showHamburger)}}>
        <span class="block w-8 h-0.5 bg-gray-200 animate-pulse"></span>
        <span class="block w-8 h-0.5 bg-gray-200 animate-pulse"></span>
        <span class="block w-8 h-0.5 bg-gray-200 animate-pulse"></span>
      </div>
    </div>

    {
      showHamburger ?
      <RefModal show = {showHamburger} onClickOutside = {setShowHamburger}>
        <div className='flex flex-col bg-sky-800 text-white  top-0 right-0 w-1/2 h-[100vh] fixed justify-center items-center'>
        <div>
              <Link to = '/cart'>
              <button type="button" class="inline-flex relative items-center p-3 text-sm font-medium text-center text-white  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaShoppingCart className='text-xl'/>
                <span class="sr-only">Notifications</span>
                {
                  user ?
                <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full  dark:border-gray-900">{data?.cart?.reduce((acc, e) => {

                  if(e.count === 0){
                    return acc + 0
                  }
                  else {
                    return acc + 1
                  }
                }, 0 )}</div>
                : null
                }
                </button>
            </Link>
            </div>
            <Link to = '/products'>
              <p className='text-md font-montserrat  font-thin text-slate-50 '>Products</p>
            </Link>
            {
              user?.userType === 'retailer' ?
                <Link to = '/new'>
                  <p className='text-md font-montserrat  font-thin text-slate-50'>
                    New
                  </p>
                </Link>
              : null
              }
            {
              !user ? <Link to = '/login'> <button>Log In</button></Link>
                : <button onClick ={handleLogout}>Log out</button>
            }
            {
                !user ?
              <Link to = '/signup'>
                <button  >
                  Sign Up
                </button>
              </Link>
              : null
            }
          
        </div>
        </RefModal>
      : null
      }
     
    
    </div> 
    
  )
}

export default Navbar