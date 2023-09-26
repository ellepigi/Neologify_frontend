import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebaseConfig"
import Card from '../Card/Card'
import { Link } from 'react-router-dom';

export default function Section  () {

  const [trending, setTrending] = useState([]);
  
  const wordsCollectionRef = collection(db, "words")

  useEffect( () => {
   const getWords = async () => {
       const data = await getDocs(wordsCollectionRef);
       setTrending(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
       console.log(data);
   }

   getWords();
  }, []); 

  return (
    <div className='page m-10 mb-12 h-full'>
      <h1 className='text-left text-4xl ml-2'>Latest</h1>

    <div className='cards flex mt-8 space-y-4 gap-2 flex-wrap w-full justify-center'>
      {trending.map(item => (
        
        <Card className="max-w-xs" key={item.id} id={item.id} title={item.title} comment={item.comment} language={item.language}
        photo={item.photo} username={item.userName} />
        
      ))}  
    </div>
    </div>
  )
}
