import React, { useEffect, useState } from 'react';
import { orderBy} from 'firebase/firestore';
import { getAllCards } from '../serivces/cardService'; 
import Card from '../Card/Card'

export default function Section  () {

  const [latest, setLatest] = useState([]);

  
  useEffect( () => {
   const getWords = async () => {
    const data = await getAllCards();
    setLatest(data);
    
   }

   getWords();
  }, []); 

  return (
    <div className='page m-10 mb-12 h-full'>
      <h1 className='text-left text-4xl ml-2'>Latest</h1>

    <div className='cards flex mt-8 space-y-4 gap-2 flex-wrap w-full justify-center'>
      {latest.map(item => (
        
        <Card className="max-w-xs" key={item.id} id={item.id} title={item.title} comment={item.comment} language={item.language}
        photo={item.photo} username={item.userName} />
        
      ))}  
    </div>
    </div>
  )
}
