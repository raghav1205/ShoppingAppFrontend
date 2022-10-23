import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { login, reset } from '../features/auth/userSlice';
import {useNavigate} from 'react-router-dom';
import useAuth from '../helpers/useAuth';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isSuccess, isError} = useSelector(state => state.user);
    const {login2} = useAuth();

   

    useEffect(() => {
      if(user || isSuccess){
        login2()
        navigate('/products')
      }
      if(isError){
        alert('Error')
      }
      dispatch(reset())
    }, [user, isLoading, isSuccess, isError])
    const handleLogin = async () => {
       dispatch(login({username, password, email}))
      };
  return (
    <div>
      <div className=' border-[1.85px] rounded-lg flex flex-col w-[20rem] md:w-[40rem] mx-auto my-[2rem] py-2 px-3'>
        <h1 className='text-4xl text-left font-semibold mb-[2rem] '>Log In</h1>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1.5 '>
                    <label className='text-left'> Username </label>
                    <input className='border-2 py-1.5 rounded-md' type = 'text'  onChange = {(e) => {setUsername(e.target.value)}} />
                </div>
            
                <div className='flex flex-col gap-1.5'>
                    <label className='text-left'> Password </label>
                    <input className='border-2 py-1.5 rounded-md' type = 'password'  onChange = {(e) => setPassword(e.target.value)}/>
                </div>
                <div>
            
                <div className='flex justify-start py-[2rem]'>
                    <button className='bg-green-700 rounded-md px-1.5 py-1 text-white' onClick = {handleLogin}>
                        Log In
                    </button>
                </div>
                </div>
            </div>
    </div>
   </div>
  )
}

export default Login