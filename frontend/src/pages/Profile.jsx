import React from 'react'
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteCookie } from '../utilities/cookie';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

function Profile() {
  const navigate = useNavigate();
    const username = useParams().username;
    console.log(username);
    const [user, setUser] = useState(null);

    function logout(){
      deleteCookie('token');
      if(!document.cookie.includes('token')) navigate('/');
    }

    useEffect(()=>{
        fetch(`https://chatkro-3.onrender.com/user/username/${username}`).then((res)=>res.json())
        .then((user)=>{
            setUser(user);
            console.log(user);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar user={user}/> 

      <div className='p-4 m-2 flex flex-col  text-xl justify-center mt-20'>
        <div className='flex justify-center text-3xl font-bold'>Profile</div>
        <div className='flex justify-center'>
          <div className='flex justify-center mt-4 p-4  border-2 border-gray-500 w-fit rounded-2xl bg-gray-300 shadow-xl'>
            <div className='flex flex-col items-start font-bold gap-8 p-4 '>
              <div className='flex '><p>Username:</p></div>
              <div className='flex '><p>Email:</p> </div>
            </div>
            <div className='flex flex-col items-start gap-8 p-4'>
              <div className='flex'><p>{user?.username}</p></div>
              <div className='flex'><p>{user?.email}</p></div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>

        <button className='mt-8 bg-blue-600 p-2 rounded-2xl text-lg text-white hover:bg-blue-800 ' onClick={logout}>Logout</button>
        </div>
    </div>

    </div>
  )
}

export default Profile
