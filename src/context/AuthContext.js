import React, {useContext, useEffect, useState} from 'react'
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

 const AuthContext = React.createContext()

 export function AuthProvider({children}) {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); 
      setIsLoading(false);
    });
      return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
     const provider = await new GoogleAuthProvider();
     return signInWithPopup(auth, provider)
    
  }
  

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const value = {
    currentUser,
    handleSignIn,
    handleSignOut,
    isLoading
  }




   return (
     <AuthContext.Provider value={value}>
       {children}
     </AuthContext.Provider>
   )
 }

 export function useAuthValue(){
   return useContext(AuthContext)
 }