import {Navigate} from 'react-router-dom'
import {useAuthValue} from './context/AuthContext'
import { Spinner } from 'flowbite-react'

export default function PrivateRoute({children}) {
  
  const {currentUser, isLoading} = useAuthValue()

  if(isLoading){
    return <Spinner/>
  }
  if(!currentUser && !isLoading ){
    return <Navigate to='/' replace/>
  }

  return children
}