import React from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { Button } from 'flowbite-react'
import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import MyPosts from './menuPages/MyPosts'
import Settings from './menuPages/Settings'


export default function Profile() {
  
  const { currentUser, handleSignOut } = useAuthValue()
  const navigate = useNavigate();


  const SignOut = () => {
    handleSignOut();
    navigate("/");
  }

  return (
    <div className='min-h-screen flex'>
       <div className='sidebar flex flex-col items-center justify-between h-screen w-64 shadow-lg'>
       <div>

          <img src={currentUser.photoURL} alt='#' className='my-8 rounded-full' />
          <ul>
            <Link to="/profile"><li>My Posts</li></Link>
            <Link to="/profile/settings"> <li>Settings</li></Link>
          </ul>
        </div>
          <Button className='mb-12' onClick={SignOut}>Logout</Button>
       </div>

          <Routes>
            <Route path='/' element={<MyPosts />} /> 
            <Route path='settings' element={<Settings />} />

          </Routes>
       
    </div>
  )

  
}
