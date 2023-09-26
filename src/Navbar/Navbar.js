import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Navbar, Dropdown, Avatar } from 'flowbite-react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from "../firebaseConfig"
import { useEffect, useState } from 'react';

export default function Nav() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); 
    });
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
     const provider = await new GoogleAuthProvider();
     return signInWithPopup(auth, provider)
    
  }
  

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (

<>
 {/* <nav class="bg-white border-gray-200 dark:bg-gray-900 shadow-md ">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
    <Link to="/" class="flex items-center">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-blue-700">Neologify</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link to="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
   
        <li>
          <Link to="/create" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create</Link>
        </li>
        <li>
          <Link to="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tags</Link>
        </li>
       
        <li>
        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Languages <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
            <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link to="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                  </li>
                  <li>
                    <Link to="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                  </li>
                </ul>
                <div class="py-1">
                  <Link to="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</Link>
                </div>
            </div>
        </li>
        <li>
          <Link to="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>  */}
<Navbar className='sm:px-8 md:px-8 lg:px-8 shadow-md' 
      fluid
      rounded
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Neologify
        </span>
        
      </Navbar.Brand>

      <div className="flex md:order-2">
      {user ? ( 
               <Dropdown
               arrowIcon={false}
               inline
               label={<Avatar alt="User settings" img={user.photoURL} rounded/>}
             >
               <Dropdown.Header>
                 <span className="block text-sm">
                   {user.displayName}
                 </span>
                 <span className="block truncate text-sm font-medium">
                   {user.email}
                 </span>
               
               </Dropdown.Header>
               <div className='flex flex-col'>
               <span className='border-b border-gray-100 pb-2'>
                  Profile
                 </span>
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

        <Navbar.Link
          active
          href="/"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/create">
          Create
        </Navbar.Link>
        <Dropdown
               arrowIcon={false}
               inline
               label="Languages"
             >
              <div className='flex flex-col'>
               <span className='border-b border-gray-100 '>
                  English
                 </span>
               <span>
                  Italian
                 </span>
                 </div>
              </Dropdown>

        <Navbar.Link href="#">
          Tags
        </Navbar.Link>

        <Navbar.Link href="#">
          About
        </Navbar.Link>
        
      </Navbar.Collapse>
    </Navbar>

    </>

  )
}
