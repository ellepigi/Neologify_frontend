import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(props){


  return (
<div class="max-w-sm rounded overflow-hidden shadow-lg rounded-md">
  <div class="px-6 py-4">
  <Link to={`/details/${props.id}`}>
    <div class="font-bold text-xl mb-2">{props.title}</div>
  </Link>
     <p className=''>{props.language}</p> 
    <p class="text-gray-700 text-base">
      {props.comment}
    </p>
    <div className='flex items-center gap-2 mt-2'>
   {props.photo && <img alt='#' src={props.photo} className='rounded h-5 w-5' />}
   {props.username && <p className='text-xs'>{props.username}</p>}
   </div>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>  )
}
