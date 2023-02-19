import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('consumer');
    const navigate = useNavigate()
    const handleClick = async () => {
      console.log('clicked');
      const REACT_APP_API_URL = `${process.env.REACT_APP_BACKEND_URL}/register`;
      const response = await fetch(REACT_APP_API_URL, {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email, 
          userType
        })
      })
  
      const data = await response.json();
      if(response.status === 201){
        navigate('/login') 
      }
      console.log(data);
      
    };
    
  return (
   <div>
    <div className=' border-[1.85px] rounded-lg flex flex-col w-[20rem] md:w-[40rem] mx-auto my-[2rem] py-2 px-3'>
      <h1 className='text-4xl text-left font-semibold mb-[2rem] '>Sign Up</h1>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1.5 '>
            <label className='text-left'> Username </label>
            <input className='border-2 py-1.5 rounded-md' type = 'text'  onChange = {(e) => {setUsername(e.target.value)}} />
        </div>
        <div className='flex flex-col gap-1.5'>
            <label className='text-left'> Email </label>
            <input className='border-2 py-1.5 rounded-md' type = 'email' onChange = {(e) => {setEmail(e.target.value)}} />
        </div>
        <div className='flex flex-col gap-1.5'>
            <label className='text-left'> Password </label>
            <input className='border-2 py-1.5 rounded-md' type = 'password'  onChange = {(e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <div className='flex flex-col justify-start'>
            <p className='text-left'>
                Already have an account ? <Link to = '/login'><span className='text-blue-800'>Log In</span></Link>
            </p>
            <div className = 'flex justify-start mt-3 '>
                <p className = 'text-xl mr-3'>Register as :</p>
                <div className = 'flex gap-3 items-center'>
                  <div className = 'flex gap-2'>
                    <span>
                      <label>
                        <input checked type = 'radio' name ='userType' className = 'mr-2' onClick = {(e) => setUserType('consumer')}/>
                          Customer
                      </label>
                    </span>
                    <span>
                      <label>
                        <input type = 'radio' name = 'userType' className = 'mr-2' onClick = {(e) => setUserType('retailer')}/>
                          Retailer
                      </label>
                    </span>
                  </div>
                </div>
            </div>
        </div>
        <div className='flex justify-start py-[2rem]'>
            <button className='bg-green-700 rounded-md px-1.5 py-1 text-white' onClick = {handleClick}>
                Sign Up
            </button>
        </div>
        </div>
    </div>
   </div>
   </div>
  )
}

export default Register