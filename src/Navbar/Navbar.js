import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useAuthValue } from '../context/AuthContext';

export default function Nav() {
  
  const { currentUser, handleSignIn, handleSignOut } = useAuthValue();

  
  return (

<>
 
<Navbar className='sm:px-8 md:px-8 lg:px-8 shadow-md' 
      fluid
      rounded
    >
      <Navbar.Brand className='hover:text-blue-500' href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Neologify
        </span>
        
      </Navbar.Brand>

      <div className="flex md:order-2">
      {currentUser ? ( 
               <Dropdown
               arrowIcon={false}
               inline
               label={<Avatar alt="User settings" img={currentUser.photoURL} rounded/>}
             >
               <Dropdown.Header>
                 <span className="block text-sm">
                   {currentUser.displayName}
                 </span>
                 <span className="block truncate text-sm font-medium">
                   {currentUser.email}
                 </span>
               
               </Dropdown.Header>
               <div className='flex flex-col'>
                <Link to="/profile">
               <span className='border-b border-gray-100 pb-2'>
                  Profile
                 </span>
                 </Link>

               <span>
                  <button onClick={handleSignOut} className='py-2'>Sign out</button>
                 </span>
                 </div>
               {/* <Item>
                 Dashboard
               </Item>
               <Item>
                 Settings
               </Item>
               <Item>
                 Earnings
               </Item>
               <Dropdown.Divider />
               <Item>
                 Sign out
               </Item> */}
             </Dropdown>
          ) : (
            <Button onClick={handleSignIn}>Sign in</Button>
          )}
        <Navbar.Toggle />
      </div>
   
      <Navbar.Collapse >

        <Link className='hover:text-blue-500'
          active
          to="/"
        >
          <p>
            Home
          </p>
        </Link>
        <Link className='hover:text-blue-500' to="/create">
          Submit
        </Link>
        

        <Link className='hover:text-blue-500' to="/tags">
          Tags
        </Link>

        <Link className='hover:text-blue-500' to="#">
          About
        </Link>
        
      </Navbar.Collapse>
    </Navbar>

    </>

  )
}
