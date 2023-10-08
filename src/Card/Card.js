import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'flowbite-react'

export default function Card(props){

  const { title, comment } = props;
  const maxCommentLength = 20; 


  const shortComment = comment.length > maxCommentLength
    ? `${comment.substring(0, maxCommentLength)}...`
    : comment;
	

  return (
<div class="w-64 rounded overflow-hidden shadow-lg rounded-md">
  <div class="px-6 py-4">
  <Link to={`/details/${props.id}`}>
    <div class="font-bold text-xl mb-2">{props.title}</div>
  </Link>
     <p className='mt-2 text-sm'>{props.language}</p> 
    <p class="text-gray-700 text-base italic my-5">
      "{shortComment}"
    </p>
    <div className='flex items-center justify-between gap-2 mt-2'>
    <div className='flex items-center gap-2'>
   {props.photo && <img alt='#' src={props.photo} className='rounded h-5 w-5' />}
   {props.username && <p className='text-xs'>{props.username}</p>}
   </div>
   <Rating>
      <Rating.Star />
      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
        4.95
      </p>     
    </Rating>
   
   </div>
  </div>
  <div class="px-6 pt-4 pb-2">

  {props.tags && props.tags.slice(0, 3).map((tag, index) => (
    <Link key={index} to={`/tag/${tag}`}>

    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-2 mb-2">
      {tag}
    </span>
    </Link>
  ))}   
    
  </div>
  
</div>  )
}
