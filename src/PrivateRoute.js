import {Navigate} from 'react-router-dom'
import {useAuthValue} from './context/AuthContext'
import { Spinner } from 'flowbite-react'

export default function PrivateRoute({children}) {
  
  const {user, isLoading} = useAuthValue()
  console.log(user)

  if(isLoading){
    return <Spinner/>
  }
  if(!user && !isLoading ){
    return <Navigate to='/' replace/>
  }

  return children
}