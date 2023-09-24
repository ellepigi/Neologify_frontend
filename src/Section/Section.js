import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebaseConfig"
import Card from '../Card/Card'

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
    <div className='page m-10 mb-12 h-screen'>
      <h1 className='text-left text-4xl ml-2'>Trending</h1>

    <div className='cards flex mt-8 gap-2 '>
      {trending.map(item => (
        <Card key={item.id} title={item.title} comment={item.comment} language={item.language} />
      ))}  
    </div>
    </div>
  )
}
